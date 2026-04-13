"use server";

import connectToDatabase from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function submitInquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required." };
  }

  try {
    await connectToDatabase();
    
    await Inquiry.create({
      name,
      email,
      subject,
      message,
    });

    return { success: true, message: "Inquiry submitted successfully! We will get back to you soon." };
  } catch (error: any) {
    console.error("Database error:", error);
    return { success: false, message: "Failed to submit inquiry. Please try again later." };
  }
}
