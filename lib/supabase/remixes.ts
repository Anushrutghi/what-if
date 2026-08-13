import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "artworks";

/** Fired after a remix is saved or deleted so galleries can refresh. */
export const REMIX_EVENT = "whatif-remixes-updated";

export type SavedRemix = {
  id: string;
  artworkId: string;
  title: string;
  transform: string;
  thumb: string; // signed URL of the stored image
  storagePath: string | null;
  createdAt: string;
};

type RemixRow = {
  id: string;
  artwork_id: string;
  title: string | null;
  era: string | null;
  artist: string | null;
  material: string | null;
  narration: string | null;
  storage_path: string | null;
  created_at: string;
};

// Cache the in-flight anonymous sign-in so concurrent callers share one session.
let sessionPromise: Promise<SupabaseClient> | null = null;

/**
 * Returns a Supabase client with an anonymous session, signing the browser in
 * once if needed. Anonymous sign-ins must be enabled in Supabase
 * (Authentication → Sign In / Up → Anonymous sign-ins).
 */
export async function createClientWithSession(): Promise<SupabaseClient> {
  if (!sessionPromise) {
    sessionPromise = (async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) {
          // Allow a retry next time — don't cache failures.
          sessionPromise = null;
          throw new Error(
            `Could not sign in to Supabase. Make sure "Anonymous sign-ins" is enabled: ${error.message}`
          );
        }
      }
      return supabase;
    })();
  }
  return sessionPromise;
}

/** Convert a data: URL into a Blob without re-encoding (preserves quality). */
export function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, b64] = dataUrl.split(",");
  const mime = meta.match(/^data:(.*?);/)?.[1] ?? "image/png";
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

/** Upload an image to the private bucket and return its storage path. */
async function uploadRemixImage(
  supabase: SupabaseClient,
  userId: string,
  remixId: string,
  blob: Blob
): Promise<string> {
  const ext = blob.type === "image/jpeg" ? "jpg" : "png";
  const path = `remixes/${userId}/${remixId}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: blob.type,
    upsert: false,
  });
  if (error) {
    throw new Error(`Could not upload the remix image: ${error.message}`);
  }
  return path;
}

export type SaveRemixInput = {
  artworkId: string;
  title: string;
  era: string | null;
  artist: string | null;
  material: string | null;
  prompt: string;
  narration: string;
  imageBlob: Blob;
};

export async function saveRemix(input: SaveRemixInput): Promise<void> {
  const supabase = await createClientWithSession();
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user.user) {
    throw new Error("Not signed in — cannot save a remix.");
  }

  const remixId = crypto.randomUUID();
  const storagePath = await uploadRemixImage(supabase, user.user.id, remixId, input.imageBlob);

  const { error } = await supabase.from("remixes").insert({
    id: remixId,
    artwork_id: input.artworkId,
    title: input.title,
    era: input.era,
    artist: input.artist,
    material: input.material,
    prompt: input.prompt,
    narration: input.narration,
    storage_path: storagePath,
  });
  if (error) {
    // Row failed — clean up the orphaned image.
    await supabase.storage.from(BUCKET).remove([storagePath]).catch(() => {});
    throw new Error(`Could not save the remix: ${error.message}`);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(REMIX_EVENT));
  }
}

export async function fetchMyRemixes(): Promise<SavedRemix[]> {
  const supabase = await createClientWithSession();

  const { data, error } = await supabase
    .from("remixes")
    .select("id, artwork_id, title, era, artist, material, narration, storage_path, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Could not load remixes: ${error.message}`);
  }
  if (!data || data.length === 0) return [];

  const rows = data as RemixRow[];

  // Private bucket → one signed URL per image (1h validity, refreshed on load).
  const signed = await Promise.all(
    rows.map((r) =>
      r.storage_path
        ? supabase.storage.from(BUCKET).createSignedUrl(r.storage_path, 3600)
        : Promise.resolve({ data: null })
    )
  );

  return rows.map((r, i) => ({
    id: r.id,
    artworkId: r.artwork_id,
    title: r.title ?? "Untitled remix",
    transform: transformFromRow(r),
    thumb: signed[i].data?.signedUrl ?? "",
    storagePath: r.storage_path ?? null,
    createdAt: r.created_at,
  }));
}

export async function deleteRemix(id: string, storagePath: string | null): Promise<void> {
  const supabase = await createClientWithSession();

  // Best-effort: remove the image object first; the row delete is the source of truth.
  if (storagePath) {
    await supabase.storage.from(BUCKET).remove([storagePath]).catch(() => {});
  }
  const { error } = await supabase.from("remixes").delete().eq("id", id);
  if (error) {
    throw new Error(`Could not delete the remix: ${error.message}`);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(REMIX_EVENT));
  }
}

function transformFromRow(row: RemixRow): string {
  const parts: string[] = [];
  if (row.artist) parts.push(`painted by ${row.artist}`);
  if (row.era) parts.push(`in ${row.era} style`);
  if (row.material) parts.push(`as ${row.material}`);
  return parts.length ? `as ${parts.join(", ")}` : "in a fresh style";
}
