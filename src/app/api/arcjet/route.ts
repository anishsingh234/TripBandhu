// app/api/arcjet/ts/route.ts
import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE", // Will block requests. Use "DRY_RUN" to log only
      characteristics: ["userId"], // Track requests by a custom user ID
      refillRate: 5, // Refill 5 tokens per interval
      interval: 86400, // Refill every 10 seconds
      capacity: 10, // Bucket maximum capacity of 10 tokens
    }),
  ],
});

export async function GET(req: Request) {
  const userId = "user123"; // Replace with your authenticated user ID

  // Deduct 5 tokens for this request
  const decision = await aj.protect(req, { userId, requested: 5 });
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      {
        error: "Too Many Requests",
        reason: decision.reason,
      },
      { status: 429 }
    );
  }

  return NextResponse.json({ message: "Hello world" });
}
