export function makeToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function isAdmin(ctx: any, token: string | null | undefined) {
  if (!token) return false;
  const session = await ctx.db
    .query("adminSessions")
    .withIndex("by_token", (q: any) => q.eq("token", token))
    .first();
  return !!session && session.expiresAt > Date.now();
}