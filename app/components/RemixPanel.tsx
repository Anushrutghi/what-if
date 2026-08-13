"use client";

import { useState } from "react";
import type { Artwork } from "@/lib/artworks";
import { dimensionGroups, type DimensionKey } from "@/lib/dimensions";
import { saveRemix, dataUrlToBlob } from "@/lib/supabase/remixes";

type RemixResult = {
  demo: boolean;
  imageUrl: string;
  filter?: string;
  prompt: string;
  narration: string;
  narrationDemo: boolean;
};

const DIM_KEYS: DimensionKey[] = ["era", "artist", "material"];

function transformLabel(artwork: Artwork, era: string | null, artist: string | null, material: string | null): string {
  const parts: string[] = [];
  if (artist) {
    const opt = dimensionGroups.artist.options.find((o) => o.id === artist);
    if (opt) parts.push(`painted by ${opt.label}`);
  }
  if (era) {
    const opt = dimensionGroups.era.options.find((o) => o.id === era);
    if (opt) parts.push(`in ${opt.label.toLowerCase()} style`);
  }
  if (material) {
    const opt = dimensionGroups.material.options.find((o) => o.id === material);
    if (opt) parts.push(`as ${opt.label.toLowerCase()}`);
  }
  return parts.length ? `as ${parts.join(", ")}` : "in a fresh, unexpected style";
}

/**
 * Draw an image (optionally with a CSS filter, for demo remixes) onto a canvas
 * and export it as a PNG Blob — this is what gets uploaded to Supabase Storage.
 */
function renderImageToBlob(src: string, filter?: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const max = 1024;
      const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not available"));
        return;
      }
      if (filter) ctx.filter = filter;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Could not export the image"))),
        "image/png"
      );
    };
    img.onerror = () => reject(new Error("Could not load the remixed image"));
    img.src = src;
  });
}

export default function RemixPanel({ artwork }: { artwork: Artwork }) {
  const [era, setEra] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [material, setMaterial] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<RemixResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const transform = transformLabel(artwork, era, artist, material);
  const hasChoice = Boolean(era || artist || material);

  async function handleRemix() {
    if (!hasChoice) {
      setError("Pick at least one dimension to remix.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    setResult(null);
    setSaved(false);
    try {
      const res = await fetch("/api/remix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId: artwork.id, era, artist, material }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      setResult(data as RemixResult);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  async function handleSave() {
    if (!result || saved || saving) return;
    setSaving(true);
    setError(null);
    try {
      // Real remixes: upload the AI image bytes as-is.
      // Demo remixes: render the filtered original to a canvas first.
      const blob = result.demo
        ? await renderImageToBlob(result.imageUrl, result.filter)
        : dataUrlToBlob(result.imageUrl);

      await saveRemix({
        artworkId: artwork.id,
        title: `${artwork.title}, ${transform}`,
        era,
        artist,
        material,
        prompt: result.prompt,
        narration: result.narration,
        imageBlob: blob,
      });
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save the remix.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="panel">
      <h2>Remix this masterpiece</h2>
      <p className="panel-sub">Pick a dimension — or combine all three for maximum chaos.</p>

      {DIM_KEYS.map((key) => {
        const group = dimensionGroups[key];
        const selected = key === "era" ? era : key === "artist" ? artist : material;
        const setSelected = key === "era" ? setEra : key === "artist" ? setArtist : setMaterial;
        return (
          <div className="dim-group" key={key}>
            <div className="dim-label">{group.label}</div>
            <div className="option-grid">
              {group.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={selected === opt.id ? "opt-btn selected" : "opt-btn"}
                  onClick={() => setSelected(selected === opt.id ? null : opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="remix-btn"
        disabled={status === "loading"}
        onClick={handleRemix}
      >
        {status === "loading" ? "Painting…" : "Create the remix"}
      </button>

      {!hasChoice && (
        <div className="demo-note">
          Tip: try “Van Gogh” with “Impressionism” — or “Pixel Art” as a material for something wild.
        </div>
      )}

      {status === "loading" && (
        <div className="loading">
          <div className="spinner" />
          Reimagining {artwork.title} {transform}… this takes a few seconds.
        </div>
      )}

      {status === "error" && error && <div className="error-box">{error}</div>}

      {result && status === "done" && (
        <div className="result">
          <h3 className="result-title">
            {artwork.title}, {transform}
          </h3>
          <div className="result-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.imageUrl}
              alt={`${artwork.title} ${transform}`}
              style={result.filter ? { filter: result.filter } : undefined}
            />
          </div>
          <div className="result-caption">
            {result.demo
              ? "Demo remix — set STABILITY_AI_API_KEY to generate real AI remixes."
              : "AI-generated remix via Stability AI."}
          </div>
          <div className="narration">
            <div className="curator">Curator&rsquo;s note</div>
            <p>{result.narration}</p>
          </div>
          <button type="button" className="save-btn" onClick={handleSave} disabled={saved || saving}>
            {saving ? "Saving…" : saved ? "Saved to your remixes" : "Save to your remixes"}
          </button>
          <details className="prompt-detail">
            <summary>View the prompt sent to the image model</summary>
            <p>{result.prompt}</p>
          </details>
        </div>
      )}
    </div>
  );
}
