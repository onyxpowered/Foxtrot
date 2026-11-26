import { Hono } from "hono";
import type { Vars } from "../Index.ts";
import * as PostStore from "../Store/Posts.ts";

export const Posts = new Hono<{ Variables: Vars }>();

Posts.get("/", (c) => {
  const userId = c.get("userId");
  return c.json(PostStore.listFeed(userId));
});

Posts.post("/", async (c) => {
  const userId = c.get("userId");
  const { text, nsfw } = await c.req.json();
  if (!text?.trim()) return c.json({ error: "text required" }, 400);
  return c.json(PostStore.createPost(userId, text, Boolean(nsfw)), 201);
});

Posts.delete("/:id", (c) => {
  const userId = c.get("userId");
  const post = PostStore.getPost(c.req.param("id"));
  if (!post) return c.json({ error: "not found" }, 404);
  if (post.authorId !== userId) return c.json({ error: "forbidden" }, 403);
  PostStore.deletePost(post.id);
  return c.body(null, 204);
});
