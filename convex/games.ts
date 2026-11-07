import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Chess } from "chess.js";
import { api } from "./_generated/api";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

async function getGameOrThrow(ctx: any, gameId: any) {
  const game = await ctx.db.get(gameId);
  if (!game) throw new Error("game not found");
  return game;
}

async function recordMatchIfFinished(ctx: any, game: any, result: string) {
  if (game.matchRecorded) return;
  const white = await ctx.db.get(game.whitePlayerId);
  const black = await ctx.db.get(game.blackPlayerId);
  if (!white || !black) return;
  const group = game.group || white.group || "1";
  const scoreA = result === "1-0" ? 1 : result === "0-1" ? 0 : 0.5;
  const scoreB = result === "1-0" ? 0 : result === "0-1" ? 1 : 0.5;
  try {
    await ctx.runMutation(api.matches.submit, {
      group,
      result: `${white.name}-${black.name} ${scoreA}-${scoreB}`,
    });
  } catch (e) {
    // ignore duplicate/errors to avoid blocking game finish
  }
  await ctx.db.patch(game._id, { matchRecorded: true });
}

export const create = mutation({
  args: {
    whitePlayerId: v.id("players"),
    blackPlayerId: v.id("players"),
    group: v.optional(v.string()),
    initialSeconds: v.number(),
    incrementSeconds: v.number(),
    unlimited: v.optional(v.boolean()),
    creatorSide: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.whitePlayerId === args.blackPlayerId) throw new Error("players must be different");
    if (!args.unlimited && args.initialSeconds < 10) throw new Error("time must be at least 10 seconds");
    const white = await ctx.db.get(args.whitePlayerId);
    const black = await ctx.db.get(args.blackPlayerId);
    if (!white || !black) throw new Error("player not found");
    const now = Date.now();
    const whiteJoined = args.creatorSide === "w";
    const blackJoined = args.creatorSide === "b";
    const bothJoined = whiteJoined && blackJoined; // (never true from a single creator)
    const id = await ctx.db.insert("games", {
      whitePlayerId: args.whitePlayerId,
      blackPlayerId: args.blackPlayerId,
      group: args.group || white.group || "1",
      status: bothJoined ? "active" : "pending",
      turn: "w",
      fen: START_FEN,
      moves: [],
      initialTimeMs: args.initialSeconds * 1000,
      incrementMs: args.incrementSeconds * 1000,
      unlimited: !!args.unlimited,
      whiteTimeMs: args.unlimited ? 0 : args.initialSeconds * 1000,
      blackTimeMs: args.unlimited ? 0 : args.initialSeconds * 1000,
      lastMoveAt: bothJoined ? now : 0,
      createdAt: new Date().toISOString(),
      whiteJoined,
      blackJoined,
    });
    return await ctx.db.get(id);
  },
});

export const join = mutation({
  args: { gameId: v.id("games"), side: v.string() },
  handler: async (ctx, args) => {
    const game: any = await getGameOrThrow(ctx, args.gameId);
    if (args.side !== "w" && args.side !== "b") throw new Error("bad side");
    if (game.status === "finished" || game.status === "cancelled") throw new Error("game already ended");
    const whiteJoined = game.whiteJoined || args.side === "w";
    const blackJoined = game.blackJoined || args.side === "b";
    const bothJoined = whiteJoined && blackJoined;
    const now = Date.now();
    const patch: any = args.side === "w" ? { whiteJoined: true } : { blackJoined: true };
    if (game.status === "pending" && bothJoined) {
      patch.status = "active";
      patch.lastMoveAt = now;
    }
    await ctx.db.patch(game._id, patch);
    return await ctx.db.get(game._id);
  },
});

export const get = query({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => ctx.db.get(args.gameId),
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const games = await ctx.db.query("games").collect();
    games.sort((a: any, b: any) => (a.createdAt > b.createdAt ? -1 : 1));
    return games.slice(0, 30);
  },
});

export const pgn = query({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game: any = await ctx.db.get(args.gameId);
    if (!game) return null;
    const white = await ctx.db.get(game.whitePlayerId);
    const black = await ctx.db.get(game.blackPlayerId);
    const wName = (white && white.name) || "White";
    const bName = (black && black.name) || "Black";
    const date = (game.createdAt || new Date().toISOString()).slice(0, 10).replace(/-/g, ".");
    const result = game.result || "*";
    const timeControl = game.unlimited ? "-" : Math.round(game.initialTimeMs / 1000) + "+" + Math.round(game.incrementMs / 1000);
    const lines = [];
    lines.push('[Event "KFUM Chess Club Online Game"]');
    lines.push('[Site "KFUM Chess Club"]');
    lines.push('[Date "' + date + '"]');
    lines.push('[White "' + wName.replace(/"/g, '\\"') + '"]');
    lines.push('[Black "' + bName.replace(/"/g, '\\"') + '"]');
    lines.push('[Result "' + result + '"]');
    lines.push('[TimeControl "' + timeControl + '"]');
    lines.push("");
    // move text
    const moves = game.moves || [];
    let body = "";
    for (let i = 0; i < moves.length; i += 2) {
      body += (Math.floor(i / 2) + 1) + ". " + moves[i];
      if (moves[i + 1]) body += " " + moves[i + 1];
      body += " ";
    }
    body = body.trim();
    if (result && result !== "*") body += (body ? " " : "") + result;
    lines.push(body || result);
    return lines.join("\n");
  },
});

function opponentSide(side: string) {
  return side === "w" ? "b" : "w";
}

export const makeMove = mutation({
  args: {
    gameId: v.id("games"),
    side: v.string(),
    from: v.string(),
    to: v.string(),
    promotion: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const game: any = await getGameOrThrow(ctx, args.gameId);
    if (game.status !== "active") throw new Error("game not active");
    if (args.side !== "w" && args.side !== "b") throw new Error("bad side");
    if (game.turn !== args.side) throw new Error("not your turn");

    const now = Date.now();
    let whiteTime = game.whiteTimeMs;
    let blackTime = game.blackTimeMs;
    // clock check / timeout
    if (!game.unlimited) {
      if (game.turn === "w") {
        whiteTime -= now - game.lastMoveAt;
        if (whiteTime <= 0) {
          await ctx.db.patch(game._id, {
            status: "finished",
            result: "0-1",
            winnerPlayerId: game.blackPlayerId,
            whiteTimeMs: 0,
            lastMoveAt: now,
            matchRecorded: false,
          });
          await recordMatchIfFinished(ctx, { ...game, matchRecorded: false }, "0-1");
          return { timeout: true, result: "0-1" };
        }
      } else {
        blackTime -= now - game.lastMoveAt;
        if (blackTime <= 0) {
          await ctx.db.patch(game._id, {
            status: "finished",
            result: "1-0",
            winnerPlayerId: game.whitePlayerId,
            blackTimeMs: 0,
            lastMoveAt: now,
            matchRecorded: false,
          });
          await recordMatchIfFinished(ctx, { ...game, matchRecorded: false }, "1-0");
          return { timeout: true, result: "1-0" };
        }
      }
    }

    const chess = new Chess(game.fen);
    const move = chess.move({ from: args.from, to: args.to, promotion: args.promotion || undefined });
    if (!move) throw new Error("illegal move");

    if (args.side === "w") whiteTime += game.incrementMs;
    else blackTime += game.incrementMs;

    const newTurn = chess.turn();
    const over = chess.isGameOver();
    let result: string | undefined;
    let winnerPlayerId: any = undefined;
    if (over) {
      if (chess.isCheckmate()) {
        result = args.side === "w" ? "1-0" : "0-1";
        winnerPlayerId = args.side === "w" ? game.whitePlayerId : game.blackPlayerId;
      } else {
        result = "1/2-1/2";
      }
    }

    await ctx.db.patch(game._id, {
      fen: chess.fen(),
      moves: [...game.moves, move.san],
      turn: newTurn,
      whiteTimeMs: whiteTime,
      blackTimeMs: blackTime,
      lastMoveAt: now,
      status: over ? "finished" : "active",
      result: over ? result : undefined,
      winnerPlayerId: over ? winnerPlayerId : undefined,
      matchRecorded: over ? false : game.matchRecorded,
    });

    if (over && result) {
      await recordMatchIfFinished(ctx, { ...game, matchRecorded: false }, result);
    }

    return { move: move.san, result: over ? result : null, over };
  },
});

export const resign = mutation({
  args: { gameId: v.id("games"), side: v.string() },
  handler: async (ctx, args) => {
    const game: any = await getGameOrThrow(ctx, args.gameId);
    if (game.status !== "active") throw new Error("game not active");
    const result = args.side === "w" ? "0-1" : "1-0";
    const winner = args.side === "w" ? game.blackPlayerId : game.whitePlayerId;
    await ctx.db.patch(game._id, {
      status: "finished",
      result,
      winnerPlayerId: winner,
      matchRecorded: false,
    });
    await recordMatchIfFinished(ctx, game, result);
    return { result };
  },
});

export const abort = mutation({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game: any = await getGameOrThrow(ctx, args.gameId);
    if (game.status !== "active" && game.status !== "pending") throw new Error("game not active");
    await ctx.db.patch(game._id, {
      status: "cancelled",
      result: undefined,
      drawOfferedBy: undefined,
      matchRecorded: false,
    });
    return { ok: true };
  },
});

export const offerDraw = mutation({
  args: { gameId: v.id("games"), side: v.string() },
  handler: async (ctx, args) => {
    const game: any = await getGameOrThrow(ctx, args.gameId);
    if (game.status !== "active") throw new Error("game not active");
    if (game.drawOfferedBy && game.drawOfferedBy !== args.side) {
      // already an offer from opponent; ignore
    } else {
      await ctx.db.patch(game._id, { drawOfferedBy: args.side });
    }
    return { ok: true };
  },
});

export const acceptDraw = mutation({
  args: { gameId: v.id("games"), side: v.string() },
  handler: async (ctx, args) => {
    const game: any = await getGameOrThrow(ctx, args.gameId);
    if (game.status !== "active") throw new Error("game not active");
    if (game.drawOfferedBy !== (args.side === "w" ? "b" : "w")) throw new Error("no draw offer from opponent");
    const result = "1/2-1/2";
    await ctx.db.patch(game._id, {
      status: "finished",
      result,
      drawOfferedBy: undefined,
      matchRecorded: false,
    });
    await recordMatchIfFinished(ctx, game, result);
    return { result };
  },
});

export const declineDraw = mutation({
  args: { gameId: v.id("games"), side: v.string() },
  handler: async (ctx, args) => {
    const game: any = await getGameOrThrow(ctx, args.gameId);
    if (game.status !== "active") throw new Error("game not active");
    if (game.drawOfferedBy === (args.side === "w" ? "b" : "w")) {
      await ctx.db.patch(game._id, { drawOfferedBy: undefined });
    }
    return { ok: true };
  },
});

export const claimTimeout = mutation({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game: any = await getGameOrThrow(ctx, args.gameId);
    if (game.status !== "active") return { result: game.result, timeout: false };
    if (game.unlimited) return { result: null, timeout: false };
    const now = Date.now();
    if (game.turn === "w") {
      const whiteTime = game.whiteTimeMs - (now - game.lastMoveAt);
      if (whiteTime <= 0) {
        await ctx.db.patch(game._id, {
          status: "finished",
          result: "0-1",
          winnerPlayerId: game.blackPlayerId,
          whiteTimeMs: 0,
          lastMoveAt: now,
          matchRecorded: false,
        });
        await recordMatchIfFinished(ctx, game, "0-1");
        return { result: "0-1", timeout: true };
      }
    } else {
      const blackTime = game.blackTimeMs - (now - game.lastMoveAt);
      if (blackTime <= 0) {
        await ctx.db.patch(game._id, {
          status: "finished",
          result: "1-0",
          winnerPlayerId: game.whitePlayerId,
          blackTimeMs: 0,
          lastMoveAt: now,
          matchRecorded: false,
        });
        await recordMatchIfFinished(ctx, game, "1-0");
        return { result: "1-0", timeout: true };
      }
    }
    return { result: null, timeout: false };
  },
});
