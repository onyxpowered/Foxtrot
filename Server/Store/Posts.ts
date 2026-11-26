import { eq, desc, inArray } from "drizzle-orm";
import { Db } from "../Db.ts";
import { Posts, Media, Follows } from "../Schema.ts";
import { randomBytes } from "crypto";

export function createPost(authorId: string, text: string, nsfw: boolean) {
  const post = {
    id: randomBytes(12).toString("hex"),
    authorId,
    text,
    nsfw,
    createdAt: new Date(),
  };
  Db.insert(Posts).values(post).run();
  return post;
}

export function getPost(id: string) {
  return Db.select().from(Posts).where(eq(Posts.id, id)).get() ?? null;
}

export function deletePost(id: string) {
  Db.delete(Posts).where(eq(Posts.id, id)).run();
}

export function listByAuthor(authorId: string, limit = 50) {
  return Db.select().from(Posts).where(eq(Posts.authorId, authorId)).orderBy(desc(Posts.createdAt)).limit(limit).all();
}

export function listFeed(userId: string, limit = 100) {
  const following = Db.select({ id: Follows.followingId }).from(Follows).where(eq(Follows.followerId, userId)).all();
  const ids = [userId, ...following.map((f) => f.id)];
  return Db.select().from(Posts).where(inArray(Posts.authorId, ids)).orderBy(desc(Posts.createdAt)).limit(limit).all();
}

export function attachMedia(postId: string, url: string, kind: "image" | "video") {
  Db.insert(Media).values({ id: randomBytes(8).toString("hex"), postId, url, kind }).run();
}

export function getMedia(postId: string) {
  return Db.select().from(Media).where(eq(Media.postId, postId)).all();
}
