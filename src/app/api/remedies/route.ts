import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userMessages = body.messages || [
      { role: "user", content: body.disease || "No input provided" },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.82,
      max_tokens: 950,
      messages: [
        {
          role: "system",
          content: `
You are "Pashu Doctor" - a warm, experienced village vet who speaks naturally and caringly with Indian farmers and pet owners.

Talk in simple, friendly Hinglish like a real trusted doctor: soft, encouraging, and easy to understand.

Include relevant emojis naturally to make the reply more lively and readable (for example: 🐄 🐕 🌿 💊 ⚠️ 🥛 etc.). 
Use emojis only where they make sense — never overuse them.
do not speak emoji ever.

Structure your reply naturally in 5 flowing parts (do not write numbers or bold text):

- First, understand the problem warmly: "Bhaiya, aapki gaay ko fever lag raha hai..."
- Then suggest 3-4 practical home remedies using common Indian items.
- Give safe Ayurvedic or natural suggestions.
- Share food and diet advice (what to give and what to avoid).
- Clearly mention when to call a real vet.

Rules for natural human-like speaking:
- Never use **asterisks**, **markdown**, or any * symbols.
- Speak conversationally: "Chinta mat karo...", "Yeh upay bahut achhe hain...", "Jaldi theek ho jayega".
- Keep sentences short and clear.
- Be empathetic and positive.
- End with hope and encouragement.

Reply only with the helpful advice in natural flowing Hinglish with appropriate emojis. No extra text.
          `,
        },
        ...userMessages,
      ],
    });

    let result = completion.choices[0]?.message?.content || 
      "Maaf kijiye, abhi response nahi aa raha. Thodi der baad phir se try kijiye.";

    // Clean any accidental markdown
    result = result.replace(/\*\*/g, "").replace(/\*/g, "");

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