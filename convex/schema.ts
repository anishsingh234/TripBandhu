import { defineSchema,defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    UserTable:defineTable({
        name:v.string(),
        imageUrl:v.string(),
        email:v.optional(v.string()),
        subscription:v.optional(v.string()),
        currentPlan:v.optional(v.string()),
        planPrice:v.optional(v.number()),
        billingCycle:v.optional(v.string()),
        planSelectedAt:v.optional(v.string()),
    }),
    TripDetailTable:defineTable({
        tripId:v.string(),
        tripDetail:v.any(),
        uid:v.id('UserTable')
    })
})