import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { image, symptoms } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // or gemini-1.5-flash if you want even faster
    });

    const prompt = `
You are a helpful veterinary assistant for villagers.
Analyze the animal image and symptoms carefully.

Respond **only** in this exact structured format (use markdown):

**🐾 Animal Type:**  
[Write the type of animal here, e.g., Cow, Dog, Buffalo, Goat, etc.]

**🩺 Possible Disease / Problem:**  
[Give 1-2 most likely problems. Keep it simple.]

**🏠 Home Remedies:**  
- Remedy 1
- Remedy 2
- Remedy 3 (if any)

**🥕 Food Recommendations:**  
- Food 1
- Food 2
- Food 3

**⚠️ Important Warning:**  
[Write "Needs immediate veterinary doctor" if serious, otherwise "Monitor for 2 days. If no improvement, call vet."]

Symptoms given: ${symptoms || "No symptoms mentioned"}

Keep language very simple, practical, and easy to understand for villagers. Use short sentences.
`;

    const base64Data = image.split(",")[1];

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const text = result.response.text();

    return NextResponse.json({
      success: true,
      result: text,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to analyze image. Please try again." },
      { status: 500 }
    );
  }
}