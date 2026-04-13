import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";

export async function GET() {
  try {
    await connectToDatabase();
    
    const DATA_FILE = path.join(process.cwd(), "src", "data", "content.json");
    const fileContents = fs.readFileSync(DATA_FILE, "utf8");
    const jsonData = JSON.parse(fileContents);
    
    // Clear and re-seed
    await Content.deleteMany({});
    await Content.create(jsonData);
    
    return NextResponse.json({ success: true, message: "Database successfully seeded from local JSON." });
  } catch (error) {
    console.error("Database seed error:", error);
    return NextResponse.json({ success: false, message: "Failed to seed database." }, { status: 500 });
  }
}
