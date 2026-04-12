import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Particles from "@/components/Particles";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Omkar IT Determination | Founder & Lead Developer",
  description: "Omkar Chavan — Founder & Lead Developer at Omkar IT Determination. Transforming complex problems into seamless digital experiences. Web development, AI integration, and SEO services.",
  keywords: "Omkar IT Determination, web developer, Next.js developer, AI integration, SEO expert, Flask developer, Omkar Chavan",
  openGraph: {
    title: "Omkar IT Determination | Founder & Lead Developer",
    description: "Transforming complex problems into seamless digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <Preloader />
        <Cursor />
        <Particles />
        {children}
      </body>
    </html>
  );
}
