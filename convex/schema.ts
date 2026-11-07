import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  players: defineTable({
    group: v.string(),
    name: v.string(),
    rating: v.number(),
    initial: v.number(),
    games: v.number(),
    wins: v.number(),
    draws: v.number(),
    losses: v.number(),
  })
    .index("by_group", ["group"])
    .index("by_group_name", ["group", "name"]),

  matches: defineTable({
    group: v.string(),
    a: v.id("players"),
    b: v.id("players"),
    nameA: v.string(),
    nameB: v.string(),
    scoreA: v.number(),
    scoreB: v.number(),
    oldA: v.number(),
    oldB: v.number(),
    newA: v.number(),
    newB: v.number(),
    deltaA: v.number(),
    deltaB: v.number(),
    date: v.string(),
  }).index("by_group", ["group"]),

  adminSessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  config: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
});