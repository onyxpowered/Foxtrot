import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const Users = sqliteTable("users", {
  id:          text("id").primaryKey(),
  username:    text("username").notNull().unique(),
  display:     text("display").notNull(),
  bio:         text("bio").notNull().default(""),
  avatar:      text("avatar"),
  createdAt:   integer("created_at", { mode: "timestamp" }).notNull(),
});

export const Sessions = sqliteTable("sessions", {
  id:        text("id").primaryKey(),
  userId:    text("user_id").notNull().references(() => Users.id),
  token:     text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const Posts = sqliteTable("posts", {
  id:        text("id").primaryKey(),
  authorId:  text("author_id").notNull().references(() => Users.id),
  text:      text("text").notNull(),
  nsfw:      integer("nsfw", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const Media = sqliteTable("media", {
  id:     text("id").primaryKey(),
  postId: text("post_id").notNull().references(() => Posts.id),
  url:    text("url").notNull(),
  kind:   text("kind", { enum: ["image", "video"] }).notNull(),
});

export const Follows = sqliteTable("follows", {
  followerId:  text("follower_id").notNull().references(() => Users.id),
  followingId: text("following_id").notNull().references(() => Users.id),
  createdAt:   integer("created_at", { mode: "timestamp" }).notNull(),
});

export const Messages = sqliteTable("messages", {
  id:        text("id").primaryKey(),
  fromId:    text("from_id").notNull().references(() => Users.id),
  toId:      text("to_id").notNull().references(() => Users.id),
  text:      text("text").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const Invites = sqliteTable("invites", {
  id:        text("id").primaryKey(),
  creatorId: text("creator_id").notNull().references(() => Users.id),
  code:      text("code").notNull().unique(),
  usedById:  text("used_by_id").references(() => Users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
