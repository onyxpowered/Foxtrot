import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import type { Vars } from "../Index.ts";
import * as UserStore from "../Store/Users.ts";

export const UsersApi = new Hono<{ Variables: Vars }>();

// Public — register with an invite code
UsersApi.post("/register", async (c) => {
  const { username, display, invite } = await c.req.json();
  if (!username || !display || !invite) return c.json({ error: "username, display, invite required" }, 400);
  if (UserStore.getUserByUsername(username)) return c.json({ error: "username taken" }, 409);
  const user = UserStore.createUser(username, display);
  const ok = UserStore.useInvite(invite, user.id);
  if (!ok) return c.json({ error: "invalid or used invite" }, 400);
  const session = UserStore.createSession(user.id);
  setCookie(c, "session", session.token, { httpOnly: true, sameSite: "Lax", path: "/" });
  return c.json(user, 201);
});

// Authenticated — get own profile
UsersApi.get("/me", (c) => {
  const userId = c.get("userId");
  return c.json(UserStore.getUser(userId));
});

// Authenticated — create an invite
UsersApi.post("/invite", (c) => {
  const userId = c.get("userId");
  return c.json(UserStore.createInvite(userId), 201);
});

// Authenticated — follow
UsersApi.post("/:id/follow", (c) => {
  const userId = c.get("userId");
  UserStore.follow(userId, c.req.param("id"));
  return c.body(null, 204);
});

// Authenticated — unfollow
UsersApi.delete("/:id/follow", (c) => {
  const userId = c.get("userId");
  UserStore.unfollow(userId, c.req.param("id"));
  return c.body(null, 204);
});
