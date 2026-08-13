import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, getArtwork } from "@/lib/artworks";
import RemixPanel from "@/app/components/RemixPanel";

export function generateStaticParams() {
  return artworks.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artwork = getArtwork(id);
  return {
    title: artwork ? `${artwork.title} by ${artwork.artist}` : "Artwork not found",
    description: artwork?.blurb,
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artwork = getArtwork(id);
  if (!artwork) notFound();

  return (
    <main className="site-main">
      <Link href="/" className="back-link">
        ← Back to the collection
      </Link>

      <div className="detail">
        <div className="artwork-stage">
          <div className="stage-frame">
            <Image
              src={artwork.imageUrl}
              alt={`${artwork.title} by ${artwork.artist}`}
              fill
              sizes="(min-width: 900px) 55vw, 100vw"
              priority
            />
          </div>
          <div className="artwork-info">
            <h1>{artwork.title}</h1>
            <div className="byline">
              {artwork.artist}, {artwork.year}
            </div>
            <div className="credit">{artwork.credit}</div>
            <div className="fact-grid">
              <div className="fact">
                <span className="k">Period</span>
                <span className="v">{artwork.period}</span>
              </div>
              <div className="fact">
                <span className="k">Medium</span>
                <span className="v">{artwork.medium}</span>
              </div>
              <div className="fact">
                <span className="k">Year</span>
                <span className="v">{artwork.year}</span>
              </div>
            </div>
          </div>
        </div>

        <RemixPanel artwork={artwork} />
      </div>
    </main>
  );
}
