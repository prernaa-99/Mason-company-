import type { Metadata } from "next";
import { Archivo, Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import BookingProvider from "@/components/BookingDialog";

/* Display — big impactful headlines. The dominant typeface. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/* Serif — expressive accent words, always italic, dropped inside headlines. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
});

/* Sans — body copy, UI, buttons. The document default. */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/* Mono — small labels, eyebrow text, numerals. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mason Company — Safer bathrooms for ageing parents",
  description:
    "Premium, doctor-informed, expert-installed bathroom safety upgrades that keep the home feeling like home. Book a Safety Visit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-ink text-cream">
        <SmoothScroll>
          {/* mounts the booking form once, for every "Book a Safety Visit" CTA */}
          <BookingProvider>{children}</BookingProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
