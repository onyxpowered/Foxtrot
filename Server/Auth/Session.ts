import { eq } from "drizzle-orm";
import { Db } from "../Db.ts";
import { Sessions, Users } from "../Schema.ts";

export function readSession(token: string | undefined) {
  if (!token) return null;
  const row = Db
    .select({ session: Sessions, user: Users })
    .from(Sessions)
    .innerJoin(Users, eq(Sessions.userId, Users.id))
    .where(eq(Sessions.token, token))
    .get();
  if (!row) return null;
  if (row.session.expiresAt < new Date()) return null;
  return row.user;
}
