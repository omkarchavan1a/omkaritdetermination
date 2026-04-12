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
  description: "Omkar Chavan — Founder & Lead Developer at Omkar IT Determination. Providing high-quality websites, landing pages, IT software, AI chatbots, CrewAI multi-agent systems, and Google Search Console SEO services.",
  keywords: "Omkar IT Determination, Omkar Chavan, web developer, Next.js developer, AI chatbot, CrewAI, multi-agent systems, SEO expert, Google Search Console, Instagram marketing, Flask developer, Python developer, The Cafe Elite, Shreetej Properties, Vercel, Hostinger, Sangamner",
  openGraph: {
    title: "Omkar IT Determination | Founder & Lead Developer",
    description: "Transforming complex problems into seamless digital experiences through web development, AI integration, and strategic SEO.",
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
