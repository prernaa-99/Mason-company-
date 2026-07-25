import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
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
      className={`${bricolage.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-ink text-cream">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
