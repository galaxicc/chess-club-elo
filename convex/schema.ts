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

  games: defineTable({
    whitePlayerId: v.id("players"),
    blackPlayerId: v.id("players"),
    group: v.string(),
    status: v.string(), // pending, active, finished, cancelled
    turn: v.string(), // w or b
    fen: v.string(),
    moves: v.array(v.string()),
    result: v.optional(v.string()), // 1-0 0-1 1/2-1/2
    initialTimeMs: v.number(),
    incrementMs: v.number(),
    unlimited: v.optional(v.boolean()),
    whiteTimeMs: v.number(),
    blackTimeMs: v.number(),
    lastMoveAt: v.number(),
    winnerPlayerId: v.optional(v.id("players")),
    matchRecorded: v.optional(v.boolean()),
    drawOfferedBy: v.optional(v.string()),
    whiteJoined: v.optional(v.boolean()),
    blackJoined: v.optional(v.boolean()),
    createdAt: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_white", ["whitePlayerId"])
    .index("by_black", ["blackPlayerId"]),

  adminSessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  config: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
});