"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { artworks } from "@/lib/artworks";
import {
  fetchMyRemixes,
  deleteRemix,
  REMIX_EVENT,
  type SavedRemix,
} from "@/lib/supabase/remixes";

export default function RemixStrip() {
  const [remixes, setRemixes] = useState<SavedRemix[]>([]);
  const [state, setState] = useState<"loading" | "error" | "ready">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const list = await fetchMyRemixes();
        if (!cancelled) {
          setRemixes(list);
          setState("ready");
        }
      } catch (e) {
        if (!cancelled) {
          setErrorMsg(e instanceof Error ? e.message : "Could not load your remixes.");
          setState("error");
        }
      }
    };
    run();
    window.addEventListener(REMIX_EVENT, run);
    return () => {
      cancelled = true;
      window.removeEventListener(REMIX_EVENT, run);
    };
  }, [retry]);

  async function handleDelete(id: string, storagePath: string | null) {
    try {
      await deleteRemix(id, storagePath);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Could not delete the remix.");
      setState("error");
    }
  }

  if (state === "loading") {
    return (
      <div className="loading">
        <div className="spinner" />
        Loading your remixes…
      </div>
    );
  }

  if (state === "error") {
    return (
      <div>
        <div className="error-box">{errorMsg}</div>
        <button
          type="button"
          className="save-btn"
          onClick={() => {
            setState("loading");
            setRetry((r) => r + 1);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  if (remixes.length === 0) {
    return (
      <div className="empty-note">
        No remixes yet — open a masterpiece and create one. Your remixes are saved to the cloud,
        so they follow you across devices.
      </div>
    );
  }

  return (
    <div>
      <div className="strip">
        {remixes.map((r) => {
          const art = artworks.find((a) => a.id === r.artworkId);
          const href = art ? `/artworks/${art.id}` : "/";
          return (
            <div className="strip-card" key={r.id}>
              <div className="strip-thumb-wrap">
                <Link href={href} className="strip-thumb-link">
                  <div className="strip-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.thumb} alt={`${r.title} ${r.transform}`} loading="lazy" />
                  </div>
                </Link>
                <button
                  type="button"
                  className="strip-delete"
                  title="Delete this remix"
                  aria-label="Delete this remix"
                  onClick={() => handleDelete(r.id, r.storagePath)}
                >
                  ×
                </button>
              </div>
              <Link href={href}>
                <div className="t">{r.title}</div>
                <div className="s">{r.transform}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
