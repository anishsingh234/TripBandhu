import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ---------------- ENV CHECK ---------------- */
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ---------------- PROMPTS ---------------- */

const SYSTEM_PROMPT = `
You are an AI Trip Planner Agent.

Objective:
Ask the user ONE question at a time to collect trip details.

Question order (STRICT):
1. source
2. destination
3. groupSize
4. budget
5. tripDuration
6. interests
7. preferences

Rules:
- Ask only ONE question.
- Wait for user reply before moving forward.
- Friendly and conversational.

Output format (STRICT JSON ONLY):
{
  "resp": "string",
  "ui": "string"
}
`;

const FINAL_PLAN_PROMPT = `
All trip details are collected. Generate a concise but complete trip plan based on the conversation.

IMPORTANT: Keep it brief but informative:
1. hotels - array of 2-3 recommended hotels with name, short description (1 line), price, and address
2. itinerary - array of daily plans with day number, title, and 2-3 key activities with time and activity name only

Output format (STRICT JSON ONLY):
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "name": "string",
        "description": "string (1 line max)",
        "price": "string",
        "address": "string"
      }
    ],
    "itinerary": [
      {
        "day": number,
        "day_plan": "string",
        "activities": [
          {
            "time": "string",
            "place_name": "string",
            "place_details": "string (1-2 lines)"
          }
        ]
      }
    ]
  }
}
`;

/* ---------------- API HANDLER ---------------- */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, isFinal } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages array" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    /* Build conversation text - only keep last 10 messages to reduce context */
    const recentMessages = messages.slice(-10);
    const conversation = recentMessages
      .map((m: {role: string; content: string}) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
${isFinal ? FINAL_PLAN_PROMPT : SYSTEM_PROMPT}

Conversation so far:
${conversation}
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: isFinal ? 0.3 : 0.6,
        responseMimeType: "application/json",
        maxOutputTokens: isFinal ? 2000 : 500,
      },
    });

    const rawText = result.response.text().trim();

    /* --------- SAFE JSON EXTRACTION --------- */
    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON found in AI response");
    }

    const cleanJson = rawText.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(cleanJson);

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ API ERROR:", error);
    return NextResponse.json(
      {
        error: "AI failed to return valid JSON",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
