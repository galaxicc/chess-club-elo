import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const K_FACTOR = 32;

function parseResult(str: string) {
  const m = String(str || "")
    .trim()
    .match(/^(.+?)-(.+?)\s+(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
  if (!m) return null;
  return { a: m[1].trim(), b: m[2].trim(), sa: parseFloat(m[3]), sb: parseFloat(m[4]) };
}

export const submit = mutation({
  args: { group: v.string(), result: v.string() },
  handler: async (ctx, args) => {
    const parsed = parseResult(args.result);
    if (!parsed) throw new Error("format: usera-userb 0.5-0.5");
    if (Math.abs(parsed.sa + parsed.sb - 1) > 1e-9)
      throw new Error("scores must sum to 1");
    if (parsed.sa < 0 || parsed.sb < 0 || parsed.sa > 1 || parsed.sb > 1)
      throw new Error("scores must be 0, 0.5 or 1");

    const players = await ctx.db
      .query("players")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .collect();
    const pa = players.find((p) => p.name.toLowerCase() === parsed.a.toLowerCase());
    const pb = players.find((p) => p.name.toLowerCase() === parsed.b.toLowerCase());
    if (!pa) throw new Error("player A not found: " + parsed.a);
    if (!pb) throw new Error("player B not found: " + parsed.b);
    if (pa._id === pb._id) throw new Error("same player");

    const ra = pa.rating;
    const rb = pb.rating;
    const ea = 1 / (1 + Math.pow(10, (rb - ra) / 400));
    const eb = 1 / (1 + Math.pow(10, (ra - rb) / 400));
    const da = K_FACTOR * (parsed.sa - ea);
    const db = K_FACTOR * (parsed.sb - eb);

    const newA = Math.round(ra + da);
    const newB = Math.round(rb + db);

    await ctx.db.patch(pa._id, {
      rating: newA,
      games: pa.games + 1,
      wins: pa.wins + (parsed.sa > parsed.sb ? 1 : 0),
      draws: pa.draws + (parsed.sa === parsed.sb ? 1 : 0),
      losses: pa.losses + (parsed.sa < parsed.sb ? 1 : 0),
    });
    await ctx.db.patch(pb._id, {
      rating: newB,
      games: pb.games + 1,
      wins: pb.wins + (parsed.sb > parsed.sa ? 1 : 0),
      draws: pb.draws + (parsed.sa === parsed.sb ? 1 : 0),
      losses: pb.losses + (parsed.sb < parsed.sa ? 1 : 0),
    });

    const matchId = await ctx.db.insert("matches", {
      group: args.group,
      a: pa._id,
      b: pb._id,
      nameA: pa.name,
      nameB: pb.name,
      scoreA: parsed.sa,
      scoreB: parsed.sb,
      oldA: ra,
      oldB: rb,
      newA,
      newB,
      deltaA: newA - ra,
      deltaB: newB - rb,
      date: new Date().toISOString(),
    });

    const updatedA = await ctx.db.get(pa._id);
    const updatedB = await ctx.db.get(pb._id);
    const match = await ctx.db.get(matchId);
    return { match, playerA: updatedA, playerB: updatedB };
  },
});

export const list = query({
  args: { group: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const lim = Math.min(args.limit ?? 50, 500);
    const matches = await ctx.db
      .query("matches")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .collect();
    matches.sort((x, y) => (x.date > y.date ? -1 : 1));
    return matches.slice(0, lim);
  },
});

export const stats = query({
  args: { group: v.string() },
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("players")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .collect();
    const sorted = [...players].sort(
      (a, b) => b.rating - a.rating || a.name.localeCompare(b.name)
    );
    const top20 = sorted.slice(0, 20).map((p, i) => ({
      rank: i + 1,
      id: p._id,
      name: p.name,
      rating: p.rating,
      games: p.games,
      wins: p.wins,
      draws: p.draws,
      losses: p.losses,
      delta: p.rating - p.initial,
    }));

    let improver: any = null;
    let worst: any = null;
    let mostActive: any = null;
    for (const p of players) {
      const delta = p.rating - p.initial;
      if (!improver || delta > improver.delta)
        improver = { name: p.name, delta, rating: p.rating };
      if (!worst || delta < worst.delta) worst = { name: p.name, delta, rating: p.rating };
      if (!mostActive || p.games > mostActive.games)
        mostActive = { name: p.name, games: p.games };
    }

    const matches = await ctx.db
      .query("matches")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .collect();
    let hotStreak: any = null;
    for (const p of players) {
      const pm = matches
        .filter((m) => m.a === p._id || m.b === p._id)
        .sort((x, y) => (x.date > y.date ? -1 : 1));
      let streak = 0;
      for (const m of pm) {
        const isA = m.a === p._id;
        const score = isA ? m.scoreA : m.scoreB;
        if (score === 1) streak++;
        else break;
      }
      if (!hotStreak || streak > hotStreak.streak)
        hotStreak = { name: p.name, streak };
    }

    return {
      top20,
      improver,
      worst,
      mostActive,
      hotStreak,
      totalPlayers: players.length,
      totalMatches: matches.length,
    };
  },
});