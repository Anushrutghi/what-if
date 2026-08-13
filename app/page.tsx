import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/lib/artworks";
import RemixStrip from "@/app/components/RemixStrip";

export default function Home() {
  return (
    <main className="site-main">
      <section className="hero">
        <div className="eyebrow">An imaginary museum</div>
        <h1>
          What if the <em>Mona Lisa</em> were painted by Van Gogh?
        </h1>
        <p>
          Take a masterpiece. Bend its era, its artist, its material. See what happens — and
          let an AI curator tell you why it matters.
        </p>
      </section>

      <section>
        <div className="section-head">
          <h2>Your remixes</h2>
          <span className="sub">Saved in this browser</span>
        </div>
        <RemixStrip />
      </section>

      <section style={{ marginTop: 64 }}>
        <div className="section-head">
          <h2>The collection</h2>
          <span className="sub">{artworks.length} masterpieces · public domain</span>
        </div>
        <div className="grid">
          {artworks.map((a) => (
            <Link key={a.id} href={`/artworks/${a.id}`} className="card">
              <div className="card-frame">
                <Image
                  src={a.imageUrl}
                  alt={`${a.title} by ${a.artist}`}
                  fill
                  sizes="(min-width: 1000px) 260px, (min-width: 640px) 33vw, 90vw"
                />
                <div className="card-overlay">
                  <span className="remix-cta">Remix this →</span>
                </div>
              </div>
              <div className="card-meta">
                <h3>{a.title}</h3>
                <div className="artist">
                  {a.artist} · {a.year}
                </div>
                <div className="chip-row">
                  <span className="chip">{a.period}</span>
                  <span className="chip">{a.medium}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
