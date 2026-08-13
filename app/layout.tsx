import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import SessionBootstrap from "@/app/components/SessionBootstrap";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12100e",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  applicationName: "The What-If Museum",
  title: {
    default: "The What-If Museum — Reimagine the Masterpieces",
    template: "%s · The What-If Museum",
  },
  description:
    "Take a famous artwork and bend its era, its artist, its material. See what happens — and learn why it matters.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    siteName: "The What-If Museum",
    title: "The What-If Museum — Reimagine the Masterpieces",
    description:
      "Take a famous artwork and bend its era, its artist, its material. See what happens — and learn why it matters.",
    images: [{ url: "/what-if.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionBootstrap />
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand">
              <Image
                src="/what-if.png"
                alt="The What-If Museum logo"
                width={40}
                height={40}
                className="brand-logo"
                priority
              />
              <span className="wordmark">
                The What-If <span className="amp">&amp;</span> Museum
              </span>
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
