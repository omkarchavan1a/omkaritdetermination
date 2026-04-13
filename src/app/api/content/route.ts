import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch the single content document.
    const content = await Content.findOne();
    
    if (!content) {
      return NextResponse.json({ 
        message: "No content found in database. Using local defaults.",
        isFallback: true 
      }, { status: 200 });
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error("MongoDB GET Error:", error);
    return NextResponse.json({ 
      message: "Database connection failed. Please check MONGODB_URI in .env.local",
      error: (error as any).message 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    // Find the first document and update it, or create it if it doesn't exist (upsert)
    let content = await Content.findOne();
    if (content) {
      // Update existing
      await Content.findByIdAndUpdate(content._id, data, { new: true });
    } else {
      // Create new
      await Content.create(data);
    }
    
    return NextResponse.json({ success: true, message: "Content updated successfully in DB" });
  } catch (error) {
    console.error("Failed to save content to DB", error);
    return NextResponse.json({ message: "Failed to save content" }, { status: 500 });
  }
}
