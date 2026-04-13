import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";

import localContent from "@/data/content.json";

// Function to fetch content from MongoDB with local fallback
async function getContent() {
  try {
    await connectToDatabase();
    // Use .lean() to convert Mongoose documents to plain JS objects.
    const dbContent = await Content.findOne().lean();
    
    if (dbContent) {
      return dbContent;
    }
    
    console.warn("No content found in MongoDB, using local fallback");
    return localContent;
  } catch (error) {
    console.error("Failed to load content from MongoDB, using local fallback", error);
    return localContent;
  }
}

export default async function Home() {
  const content = await getContent();

  if (!content) {
    return <div>Failed to load content. Please check server logs.</div>;
  }

  return (
    <main>
      <Navbar />
      <Hero content={content.hero} />
      <Marquee />
      <About content={content.about} />
      <Services content={content.services} />
      <Portfolio content={content.portfolio} />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
