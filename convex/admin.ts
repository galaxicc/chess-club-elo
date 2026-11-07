import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { makeToken } from "./lib";

async function getConfigPassword(ctx: any) {
  const doc = await ctx.db
    .query("config")
    .withIndex("by_key", (q: any) => q.eq("key", "adminPassword"))
    .first();
  return doc?.value || process.env.ADMIN_PASSWORD || "chessadmin";
}

export const login = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    const expected = await getConfigPassword(ctx);
    if (args.password !== expected) {
      throw new Error("bad password");
    }
    const token = makeToken();
    await ctx.db.insert("adminSessions", {
      token,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });
    return { token };
  },
});

export const changePassword = mutation({
  args: { adminToken: v.string(), newPassword: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q: any) => q.eq("token", args.adminToken))
      .first();
    if (!session || session.expiresAt <= Date.now()) throw new Error("unauthorized");
    if (!args.newPassword || args.newPassword.length < 4) {
      throw new Error("password must be at least 4 characters");
    }
    const existing = await ctx.db
      .query("config")
      .withIndex("by_key", (q: any) => q.eq("key", "adminPassword"))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.newPassword });
    } else {
      await ctx.db.insert("config", { key: "adminPassword", value: args.newPassword });
    }
    return { ok: true };
  },
});

export const setTabName = mutation({
  args: { adminToken: v.string(), group: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q: any) => q.eq("token", args.adminToken))
      .first();
    if (!session || session.expiresAt <= Date.now()) throw new Error("unauthorized");
    if (!["1","2","3","4","5","6","7","8","9","10"].includes(args.group)) throw new Error("bad group");
    const trimmed = args.name.trim();
    if (!trimmed) throw new Error("name required");
    const key = "tabName_" + args.group;
    const existing = await ctx.db
      .query("config")
      .withIndex("by_key", (q: any) => q.eq("key", key))
      .first();
    if (existing) await ctx.db.patch(existing._id, { value: trimmed });
    else await ctx.db.insert("config", { key, value: trimmed });
    return { ok: true };
  },
});

export const setMotd = mutation({
  args: { adminToken: v.string(), motd: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q: any) => q.eq("token", args.adminToken))
      .first();
    if (!session || session.expiresAt <= Date.now()) throw new Error("unauthorized");
    const existing = await ctx.db
      .query("config")
      .withIndex("by_key", (q: any) => q.eq("key", "motd"))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.motd });
    } else {
      await ctx.db.insert("config", { key: "motd", value: args.motd });
    }
    return { ok: true };
  },
});
