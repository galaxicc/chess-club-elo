import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { HTML } from "./frontend";

const http = httpRouter();

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    Vary: "origin",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function errMsg(e: any) {
  return String(e?.message || 'error').split('\n')[0].replace(/^Uncaught Error:\s*/i, '').trim() || 'error';
}

function json(data: unknown, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function parsePath(request: Request) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  // expected: api / groups / {group} / {resource} / {id?}
  const group = parts[2] || "";
  const resource = parts[3] || "";
  const id = parts[4] || null;
  return { url, group, resource, id, origin: request.headers.get("Origin") };
}

async function handle(request: Request, ctx: any) {
  const { group, resource, id, origin, url } = parsePath(request);
  if (![...Array(10)].map((_, i) => String(i + 1)).includes(group)) return json({ error: "bad group" }, 404, origin);
  const adminToken = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim() || null;

  try {
    if (resource === "players" && request.method === "GET") {
      const players = await ctx.runQuery(api.players.list, { group });
      return json(players, 200, origin);
    }
    if (resource === "players" && request.method === "POST") {
      const body = await request.json();
      const player = await ctx.runMutation(api.players.create, {
        group,
        name: body.name,
        adminToken: adminToken || "",
      });
      return json(player, 200, origin);
    }
    if (resource === "players" && request.method === "DELETE") {
      if (!id) return json({ error: "missing id" }, 400, origin);
      const res = await ctx.runMutation(api.players.remove, {
        group,
        playerId: id,
        adminToken: adminToken || "",
      });
      return json(res, 200, origin);
    }
    if (resource === "matches" && request.method === "GET") {
      const limit = parseInt(url.searchParams.get("limit") || "50", 10);
      const matches = await ctx.runQuery(api.matches.list, { group, limit });
      return json(matches, 200, origin);
    }
    if (resource === "matches" && request.method === "POST") {
      const body = await request.json();
      const result = await ctx.runMutation(api.matches.submit, {
        group,
        result: body.result,
      });
      return json(result, 200, origin);
    }
    if (resource === "stats" && request.method === "GET") {
      const stats = await ctx.runQuery(api.matches.stats, { group });
      return json(stats, 200, origin);
    }
    if (resource === "reset" && request.method === "POST") {
      const res = await ctx.runMutation(api.players.reset, {
        group,
        adminToken: adminToken || "",
      });
      return json(res, 200, origin);
    }
    return json({ error: "not found" }, 404, origin);
  } catch (e: any) {
    return json({ error: errMsg(e) }, 400, origin);
  }
}

const handler = httpAction(async (ctx, request) => handle(request, ctx));

http.route({ pathPrefix: "/api/groups/", method: "GET", handler });
http.route({ pathPrefix: "/api/groups/", method: "POST", handler });
http.route({ pathPrefix: "/api/groups/", method: "DELETE", handler });
http.route({ pathPrefix: "/api/groups/", method: "OPTIONS", handler: httpAction(async (_, request) => {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get("Origin")) });
}) });

// admin login
http.route({
  path: "/api/admin/login",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const origin = request.headers.get("Origin");
    try {
      const body = await request.json();
      const res = await ctx.runMutation(api.admin.login, { password: body.password });
      return json(res, 200, origin);
    } catch (e: any) {
      return json({ error: errMsg(e) }, 401, origin);
    }
  }),
});
http.route({
  path: "/api/admin/login",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, { status: 204, headers: corsHeaders(request.headers.get("Origin")) });
  }),
});

// admin change password
http.route({
  path: "/api/admin/change-password",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const origin = request.headers.get("Origin");
    const adminToken = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
    try {
      const body = await request.json();
      const res = await ctx.runMutation(api.admin.changePassword, {
        adminToken,
        newPassword: body.newPassword,
      });
      return json(res, 200, origin);
    } catch (e: any) {
      return json({ error: errMsg(e) }, 400, origin);
    }
  }),
});
http.route({
  path: "/api/admin/change-password",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, { status: 204, headers: corsHeaders(request.headers.get("Origin")) });
  }),
});

// Tab names
http.route({
  path: "/api/tab-names",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      const names = await ctx.runQuery(api.site.tabNames, {});
      return json(names, 200, request.headers.get("Origin"));
    } catch (e: any) {
      return json({ error: errMsg(e) }, 400, request.headers.get("Origin"));
    }
  }),
});
http.route({
  path: "/api/tab-names",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => new Response(null, { status: 204, headers: corsHeaders(request.headers.get("Origin")) })),
});

http.route({
  path: "/api/admin/tab-name",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const origin = request.headers.get("Origin");
    const adminToken = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
    try {
      const body = await request.json();
      const res = await ctx.runMutation(api.admin.setTabName, {
        adminToken,
        group: String(body.group),
        name: body.name,
      });
      return json(res, 200, origin);
    } catch (e: any) {
      return json({ error: errMsg(e) }, 400, origin);
    }
  }),
});
http.route({
  path: "/api/admin/tab-name",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => new Response(null, { status: 204, headers: corsHeaders(request.headers.get("Origin")) })),
});

// MOTD + latest registered user
http.route({
  path: "/api/motd",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const origin = request.headers.get("Origin");
    try {
      const motd = await ctx.runQuery(api.site.motd, {});
      return json({ motd }, 200, origin);
    } catch (e: any) {
      return json({ error: errMsg(e) }, 400, origin);
    }
  }),
});
http.route({
  path: "/api/motd",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => new Response(null, { status: 204, headers: corsHeaders(request.headers.get("Origin")) })),
});

http.route({
  path: "/api/latest-registered",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const origin = request.headers.get("Origin");
    try {
      const name = await ctx.runQuery(api.site.latestRegistered, {});
      return json({ name }, 200, origin);
    } catch (e: any) {
      return json({ error: errMsg(e) }, 400, origin);
    }
  }),
});
http.route({
  path: "/api/latest-registered",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => new Response(null, { status: 204, headers: corsHeaders(request.headers.get("Origin")) })),
});

http.route({
  path: "/api/admin/motd",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const origin = request.headers.get("Origin");
    const adminToken = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
    try {
      const body = await request.json();
      const res = await ctx.runMutation(api.admin.setMotd, {
        adminToken,
        motd: body.motd ?? "",
      });
      return json(res, 200, origin);
    } catch (e: any) {
      return json({ error: errMsg(e) }, 400, origin);
    }
  }),
});
http.route({
  path: "/api/admin/motd",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => new Response(null, { status: 204, headers: corsHeaders(request.headers.get("Origin")) })),
});

// Serve the frontend from the same deployment (single-origin, no CORS needed)
http.route({
  path: "/",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(HTML, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }),
});
http.route({
  path: "/",
  method: "OPTIONS",
  handler: httpAction(async () => new Response(null, { status: 204 })),
});

export default http;