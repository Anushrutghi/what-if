import { NextResponse } from "next/server";
import { getArtwork } from "@/lib/artworks";
import { findOption } from "@/lib/dimensions";
import { narrate } from "@/lib/narration";

export const runtime = "nodejs";
// Stability AI generations can take 10-30s; allow up to 60s (Vercel Hobby max).
export const maxDuration = 60;

const NEGATIVE_PROMPT = "text, watermark, signature, frame, border, low quality, blurry, deformed, distorted, ugly";

/** Compose the style directive fed to the image model. */
function buildPrompt(
  artworkId: string,
  title: string,
  artist: string,
  eraPrompt?: string,
  artistPrompt?: string,
  materialPrompt?: string
): string {
  const styles = [artistPrompt, eraPrompt, materialPrompt].filter(Boolean).join("; ");
  const styleClause = styles || "in the style of a bold contemporary oil painting";
  return `Repaint this artwork exactly as it is — keep the same subject, composition and all recognizable elements — but ${styleClause}. Artwork: ${title} by ${artist} (${artworkId}).`;
}

/** Deterministic stand-in "style" used when no image API key is configured. */
const DEMO_FILTERS = [
  "sepia(0.85) contrast(1.18) saturate(1.15)",
  "hue-rotate(75deg) saturate(1.5) contrast(1.05)",
  "grayscale(1) contrast(1.35)",
  "sepia(0.5) hue-rotate(-25deg) saturate(2.1) contrast(1.1)",
  "hue-rotate(160deg) saturate(0.8)",
  "invert(0.9) hue-rotate(180deg) saturate(1.25)",
  "saturate(2.4) contrast(1.2)",
  "sepia(0.7) contrast(1.3) brightness(0.95)",
];

function pickDemoFilter(...ids: (string | undefined)[]): string {
  const seed = ids.filter(Boolean).join("|");
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return DEMO_FILTERS[hash % DEMO_FILTERS.length];
}

export async function POST(req: Request) {
  let body: { artworkId?: string; era?: string; artist?: string; material?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { artworkId, era: eraId, artist: artistId, material: materialId } = body;
  const artwork = artworkId ? getArtwork(artworkId) : undefined;
  if (!artwork) {
    return NextResponse.json({ error: "Unknown artwork" }, { status: 404 });
  }

  const era = findOption("era", eraId);
  const artist = findOption("artist", artistId);
  const material = findOption("material", materialId);

  const prompt = buildPrompt(
    artwork.id,
    artwork.title,
    artwork.artist,
    era?.prompt,
    artist?.prompt,
    material?.prompt
  );

  // Narrate in parallel — LLM-backed when LLM_API_KEY is set, template otherwise.
  const narrationPromise = narrate({ artwork, era, artist, material });

  const apiKey = process.env.STABILITY_AI_API_KEY;

  // Demo mode: no key configured. Return the original with a stylistic filter
  // so the experience is fully testable without any credentials.
  if (!apiKey) {
    const { narration, demo: narrationDemo } = await narrationPromise;
    return NextResponse.json({
      demo: true,
      imageUrl: artwork.imageUrl,
      filter: pickDemoFilter(era?.id, artist?.id, material?.id),
      prompt,
      narration,
      narrationDemo,
    });
  }

  try {
    // Download the original artwork (Wikimedia requires a descriptive User-Agent).
    let original: Response;
    try {
      original = await fetch(artwork.imageUrl, {
        headers: { "User-Agent": "WhatIfMuseum/0.1 (art remix prototype; contact: local)" },
      });
    } catch {
      return NextResponse.json(
        { error: "Could not reach the artwork image source (network error)" },
        { status: 502 }
      );
    }
    if (!original.ok) {
      return NextResponse.json(
        { error: `Could not fetch original artwork (${original.status})` },
        { status: 502 }
      );
    }

    const imageBytes = Buffer.from(await original.arrayBuffer());
    if (imageBytes.length === 0) {
      return NextResponse.json({ error: "Received an empty artwork image" }, { status: 502 });
    }

    const form = new FormData();
    form.append("prompt", prompt);
    form.append(
      "image",
      new Blob([imageBytes], { type: original.headers.get("content-type") ?? "image/jpeg" }),
      "artwork.jpg"
    );
    form.append("mode", "image-to-image");
    form.append("strength", "0.6");
    form.append("output_format", "png");
    form.append("negative_prompt", NEGATIVE_PROMPT);

    let stabilityRes: Response;
    try {
      stabilityRes = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "image/*",
          "User-Agent": "WhatIfMuseum/0.1 (art remix prototype)",
        },
        body: form,
      });
    } catch {
      return NextResponse.json(
        { error: "Could not reach the image generation provider (network error)" },
        { status: 502 }
      );
    }

    const { narration, demo: narrationDemo } = await narrationPromise;

    if (!stabilityRes.ok) {
      const errText = await stabilityRes.text();
      console.error("Stability AI error:", stabilityRes.status, errText);
      return NextResponse.json(
        { error: `Image generation failed (${stabilityRes.status}): ${errText.slice(0, 300)}` },
        { status: 502 }
      );
    }

    const buf = Buffer.from(await stabilityRes.arrayBuffer());
    if (buf.length === 0) {
      return NextResponse.json({ error: "Image provider returned an empty image" }, { status: 502 });
    }

    const contentType = stabilityRes.headers.get("content-type") ?? "image/png";
    const dataUrl = `data:${contentType};base64,${buf.toString("base64")}`;

    return NextResponse.json({ demo: false, imageUrl: dataUrl, prompt, narration, narrationDemo });
  } catch (e) {
    console.error("Remix route unexpected error:", e);
    return NextResponse.json(
      { error: "Unexpected error while creating the remix. Please try again." },
      { status: 500 }
    );
  }
}
