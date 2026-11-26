import { Card } from "./Card.tsx";
import { Avatar } from "./Avatar.tsx";
import { Color, Font, Type, Space } from "./Token.ts";

interface Media { id: string; url: string; kind: "image" | "video" }

interface Props {
  id: string;
  text: string;
  nsfw: boolean;
  author: { id: string; username: string; display: string; avatar?: string | null };
  media?: Media[];
  createdAt: string;
}

export function Post({ text, nsfw, author, media = [], createdAt }: Props) {
  const time = new Date(createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return (
    <Card size="md" style={{ display: "flex", flexDirection: "column", gap: Space[3] }}>
      <div style={{ display: "flex", alignItems: "center", gap: Space[3] }}>
        <Avatar src={author.avatar} display={author.display} size={32} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: Font.sans, fontSize: Type.sm.fontSize, fontWeight: 500, color: Color.text }}>
            {author.display}
          </span>
          <span style={{ fontFamily: Font.mono, fontSize: Type.xs.fontSize, color: Color.muted, marginLeft: Space[2] }}>
            @{author.username}
          </span>
        </div>
        <span style={{ fontFamily: Font.mono, fontSize: Type.xs.fontSize, color: Color.muted, flexShrink: 0 }}>
          {time}
        </span>
      </div>

      {nsfw && (
        <span style={{ fontFamily: Font.mono, fontSize: Type.xs.fontSize, color: Color.danger, letterSpacing: "0.05em" }}>
          NSFW
        </span>
      )}

      <p style={{ fontFamily: Font.sans, fontSize: Type.base.fontSize, lineHeight: Type.base.lineHeight, color: Color.text, margin: 0 }}>
        {text}
      </p>

      {media.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: media.length === 1 ? "1fr" : "1fr 1fr",
            gap: Space[2],
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {media.map((m) => (
            <img
              key={m.id}
              src={m.url}
              alt=""
              style={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                filter: nsfw ? "blur(20px)" : undefined,
                display: "block",
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
