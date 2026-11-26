import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { readSession } from "./Auth/Session.ts";
import { Posts } from "./Api/Posts.ts";
import { UsersApi } from "./Api/Users.ts";

export type Vars = { userId: string };

const App = new Hono<{ Variables: Vars }>();

// Unauthenticated routes
App.route("/api/users", UsersApi);

// Session gate for everything else under /api
App.use("/api/*", async (c, next) => {
  const token = getCookie(c, "session");
  const user = readSession(token);
  if (!user) return c.json({ error: "unauthorized" }, 401);
  c.set("userId", user.id);
  await next();
});

App.route("/api/posts", Posts);

App.get("/health", (c) => c.json({ ok: true }));

export default {
  port: Number(process.env.PORT ?? 3001),
  fetch: App.fetch,
};
