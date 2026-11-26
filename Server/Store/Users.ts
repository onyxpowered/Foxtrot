import { eq } from "drizzle-orm";
import { Db } from "../Db.ts";
import { Users, Follows, Invites, Sessions } from "../Schema.ts";
import { randomBytes } from "crypto";

export function getUser(id: string) {
  return Db.select().from(Users).where(eq(Users.id, id)).get() ?? null;
}

export function getUserByUsername(username: string) {
  return Db.select().from(Users).where(eq(Users.username, username)).get() ?? null;
}

export function createUser(username: string, display: string) {
  const user = {
    id: randomBytes(12).toString("hex"),
    username,
    display,
    bio: "",
    avatar: null,
    createdAt: new Date(),
  };
  Db.insert(Users).values(user).run();
  return user;
}

export function follow(followerId: string, followingId: string) {
  Db.insert(Follows).values({ followerId, followingId, createdAt: new Date() }).run();
}

export function unfollow(followerId: string, followingId: string) {
  Db.delete(Follows)
    .where(eq(Follows.followerId, followerId))
    .where(eq(Follows.followingId, followingId))
    .run();
}

export function createSession(userId: string) {
  const session = {
    id: randomBytes(12).toString("hex"),
    userId,
    token: randomBytes(32).toString("hex"),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };
  Db.insert(Sessions).values(session).run();
  return session;
}

export function createInvite(creatorId: string) {
  const invite = {
    id: randomBytes(8).toString("hex"),
    creatorId,
    code: randomBytes(6).toString("hex"),
    usedById: null,
    createdAt: new Date(),
  };
  Db.insert(Invites).values(invite).run();
  return invite;
}

export function useInvite(code: string, userId: string) {
  const invite = Db.select().from(Invites).where(eq(Invites.code, code)).get();
  if (!invite || invite.usedById) return false;
  Db.update(Invites).set({ usedById: userId }).where(eq(Invites.code, code)).run();
  return true;
}
