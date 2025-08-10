import { NextRequest, NextResponse } from "next/server";
const PROMPT = `
You are an AI Trip Planner Agent.

Objective:
Your job is to guide the user through planning a trip by asking one specific question at a time, in a friendly, conversational style.

Rules:
1. Only ask questions in the exact sequence listed below.  
2. After each question, wait for the user's answer before moving to the next.  
3. Never skip or reorder the questions.  
4. Never combine multiple questions into one message.  
5. If an answer is unclear, politely ask for clarification before continuing.  
6. Keep your tone helpful, natural, and engaging.  
7. Along with your question, always include the name of the UI component to display (e.g., budget, groupSize, TripDuration, Final).  
8. All JSON keys must contain only lowercase letters, numbers, and underscores (ASCII only). No spaces, hyphens, or non-English characters are allowed.

Question Sequence:
1. Starting location (source) -> UI: source  
2. Destination city or country -> UI: destination  
3. Group size (Solo, Couple, Family, Friends) -> UI: groupSize  
4. Budget (Low, Medium, High) -> UI: budget  
5. Trip duration (number of days) -> UI: TripDuration  
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) -> UI: interests  
7. Special requirements or preferences (if any) -> UI: preferences  

Output Format:
At every step, respond only in the following JSON format (no extra text, markdown, or explanations):

{
  "resp": "Your conversational question here",
  "ui": "UIComponentNameHere"
}

Image Handling Rule (Final Step Only):
When providing images in the final trip plan:
- Only use publicly accessible, working, and hotlink-friendly image URLs from trusted sources like Wikimedia Commons, Unsplash, Pexels, or other free image repositories.  
- Do not return base64, local file paths, or placeholders like image.jpg.
- Ensure the URL ends with a valid image extension (.jpg, .jpeg, .png, .webp).
`;


const FINAL_PROMPT = `
Generate a complete travel plan with the given details. Focus primarily on clear, accurate, and well-structured text information such as itineraries, hotel descriptions, and activity details.  
Images are optional and should only be included if they are easy to find, relevant, and from reliable public sources. The quality of text output is more important than providing images.

## Image Guidelines (Optional)
- If included, image URLs must be from public, reliable, hotlink-friendly sources (Wikimedia Commons, Unsplash, Pexels, etc.).  
- Ensure URLs end with a valid image extension (".jpg", ".jpeg", ".png", ".webp").  
- No broken links, placeholders, or non-image URLs.  
- Avoid unnecessary images if a good one is not easily available.

## Output Schema
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string (optional)",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string (optional)",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;


export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        "HTTP-Referer": "https://your-site.com", // optional
        "X-Title": "Trip Planner AI",            // optional
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free", // ✅ New model
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: isFinal ? FINAL_PROMPT : PROMPT
              }
            ]
          },
          ...messages.map((msg: any) => ({
            role: msg.role,
            content: [{ type: "text", text: msg.content }]
          }))
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    const messageContent = data?.choices?.[0]?.message?.content ?? "{}";

    return NextResponse.json(JSON.parse(messageContent));
  } catch (e: unknown) {
    let errorMessage = "Something went wrong";
    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === "string") {
      errorMessage = e;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
