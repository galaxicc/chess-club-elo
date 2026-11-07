import { query } from "./_generated/server";

async function getConfig(ctx: any, key: string) {
  const doc = await ctx.db
    .query("config")
    .withIndex("by_key", (q: any) => q.eq("key", key))
    .first();
  return doc?.value ?? null;
}

function defaultTabName(group: string) {
  return "Tab " + group;
}

export const tabNames = query({
  args: {},
  handler: async (ctx) => {
    const result: Record<string, string> = {};
    for (let i = 1; i <= 10; i++) {
      const g = String(i);
      const configured = await getConfig(ctx, "tabName_" + g);
      result[g] = configured || defaultTabName(g);
    }
    return result;
  },
});

export const motd = query({
  args: {},
  handler: async (ctx) => getConfig(ctx, "motd"),
});

export const latestRegistered = query({
  args: {},
  handler: async (ctx) => {
    const configured = await getConfig(ctx, "latestRegistered");
    if (configured) return configured;
    const players = await ctx.db.query("players").collect();
    if (!players.length) return null;
    const latest = players.reduce((a, b) => (a._creationTime > b._creationTime ? a : b));
    return latest.name;
  },
});
