import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("MongoDB GET Error:", error);
    return NextResponse.json({ message: "Failed to load inquiries from DB" }, { status: 500 });
  }
}

// Optional: Add a DELETE handler if the user wants to clear inquiries
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connectToDatabase();

    if (id) {
      await Inquiry.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Inquiry deleted" });
    } else {
      // Potentially clear all if no ID is provided, but that's dangerous
      // await Inquiry.deleteMany({});
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }
  } catch (error) {
    console.error("MongoDB DELETE Error:", error);
    return NextResponse.json({ message: "Failed to delete inquiry" }, { status: 500 });
  }
}
