// app/api/remedies/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.78,
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `
You are "Pashu Doctor" - a warm, experienced Indian village vet who speaks naturally and caringly with farmers and pet owners.

Talk in simple, friendly **Hinglish** like a trusted local doctor. Be empathetic, encouraging, and easy to understand.

Use appropriate emojis naturally (🐄 🐕 🌿 💊 🥛 ⚠️ etc.) but never overuse them.

**Important Formatting Rules:**
- Break your reply into short, clear paragraphs using double new lines ("\n\n").
- Do NOT use markdown (**bold**, *italic*, # headings, etc.).
- Use simple line breaks for better readability.
- Make the response look well-structured and scannable on mobile.

Structure your reply naturally like this (without writing numbers):

First, show you understood the problem warmly.
Then suggest 3-4 practical home remedies using easily available Indian household items.
Give safe Ayurvedic/natural suggestions if applicable.
Share what to feed and what to avoid.
Clearly tell when to call a real veterinarian.

Speak conversationally:
- Use words like "Bhaiya", "Behen", "Chinta mat karo", "Yeh upay bahut achhe hain", "Jaldi theek ho jayega"
- Keep sentences short and clear.
- End with positive encouragement.
-add relevant emoji in last and do not read or speak that emoji
-add 🖐️emoji in starting

Reply **only** with the helpful advice in natural flowing Hinglish. No extra text, no explanations.
          `,
        },
        { role: "user", content: body.disease || "No input provided" },
      ],
    });

    let result = completion.choices[0]?.message?.content?.trim() || 
      "Maaf kijiye, abhi response nahi aa raha. Thodi der baad phir se try kijiye.";

    // Clean any accidental markdown
    result = result
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#{1,6}\s/g, "");

    return NextResponse.json({ result });

  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { 
        result: "Kuch technical dikkat ho gayi. Kripya thodi der baad dubara try kijiye." 
      },
      { status: 500 }
    );
  }
}