import type { Metadata } from "next";
import Link from "next/link";
import SessionBootstrap from "@/app/components/SessionBootstrap";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The What-If Museum — Reimagine the Masterpieces",
    template: "%s · The What-If Museum",
  },
  description:
    "Take a famous artwork and bend its era, its artist, its material. See what happens — and learn why it matters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionBootstrap />
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="wordmark">
              The What-If <span className="amp">&amp;</span> Museum
            </Link>
            <span className="tagline">An imaginary museum of real art history</span>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          All artworks shown are public domain images from Wikimedia Commons.
          <div className="hint">
            Remixes are generated with AI (Stability AI) and narrated by an AI curator.
          </div>
        </footer>
      </body>
    </html>
  );
}
