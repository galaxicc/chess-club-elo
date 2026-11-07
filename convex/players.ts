import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { isAdmin } from "./lib";

export const list = query({
  args: { group: v.string() },
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("players")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .collect();
    return players.map((p) => {
      const { ...rest } = p;
      return rest;
    });
  },
});

export const create = mutation({
  args: { group: v.string(), name: v.string(), adminToken: v.string() },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx, args.adminToken))) throw new Error("unauthorized");
    const name = args.name.trim();
    if (!name) throw new Error("name required");
    const existing = await ctx.db
      .query("players")
      .withIndex("by_group_name", (q) => q.eq("group", args.group).eq("name", name))
      .first();
    if (existing) throw new Error("player exists");
    const startingRating = name.toLowerCase() === "number1" ? 2300 : 1800;
    const id = await ctx.db.insert("players", {
      group: args.group,
      name,
      rating: startingRating,
      initial: startingRating,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
    });
    const existingLatest = await ctx.db
      .query("config")
      .withIndex("by_key", (q: any) => q.eq("key", "latestRegistered"))
      .first();
    if (existingLatest) await ctx.db.patch(existingLatest._id, { value: name });
    else await ctx.db.insert("config", { key: "latestRegistered", value: name });
    const player = await ctx.db.get(id);
    return player;
  },
});

export const remove = mutation({
  args: { group: v.string(), playerId: v.id("players"), adminToken: v.string() },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx, args.adminToken))) throw new Error("unauthorized");
    const id = args.playerId;
    const player = await ctx.db.get(id);
    if (!player || player.group !== args.group) throw new Error("not found");
    await ctx.db.delete(id);
    return { ok: true };
  },
});

export const reset = mutation({
  args: { group: v.string(), adminToken: v.string() },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx, args.adminToken))) throw new Error("unauthorized");
    const players = await ctx.db
      .query("players")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .collect();
    for (const p of players) await ctx.db.delete(p._id);
    const matches = await ctx.db
      .query("matches")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .collect();
    for (const m of matches) await ctx.db.delete(m._id);
    return { ok: true };
  },
});