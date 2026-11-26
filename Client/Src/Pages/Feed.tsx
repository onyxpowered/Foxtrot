import { useEffect, useState } from "react";
import { Nav } from "../Ui/Nav.tsx";
import { Post } from "../Ui/Post.tsx";
import { Color, Space } from "../Ui/Token.ts";

type User = { id: string; username: string; display: string; avatar?: string | null };
type PostData = { id: string; text: string; nsfw: boolean; authorId: string; createdAt: string };

export function Feed() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetch("/api/users/me").then((r) => r.ok ? r.json() : null).then(setUser).catch(() => {});
    fetch("/api/posts").then((r) => r.ok ? r.json() : []).then(setPosts).catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: Color.bg }}>
      <Nav user={user} />
      <main style={{ maxWidth: 600, margin: "0 auto", padding: `${Space[6]} ${Space[4]}`, display: "flex", flexDirection: "column", gap: Space[3] }}>
        {posts.length === 0 && (
          <p style={{ color: Color.muted, textAlign: "center", marginTop: Space[12] }}>nothing here yet.</p>
        )}
        {posts.map((p) => (
          <Post
            key={p.id}
            id={p.id}
            text={p.text}
            nsfw={p.nsfw}
            author={{ id: p.authorId, username: p.authorId, display: p.authorId }}
            createdAt={p.createdAt}
          />
        ))}
      </main>
    </div>
  );
}
