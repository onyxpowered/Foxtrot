import { useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar.tsx";
import { Color, Font, Radius } from "./Token.ts";

interface Props {
  user?: { username: string; display: string; avatar?: string | null } | null;
}

export function Nav({ user }: Props) {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: `${Color.bg}cc`,
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${Color.border}`,
      }}
    >
      <span
        onClick={() => navigate("/")}
        style={{ fontFamily: Font.mono, fontSize: "14px", fontWeight: 500, color: Color.text, cursor: "pointer", letterSpacing: "0.04em" }}
      >
        FOXTROT
      </span>

      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate(`/${user.username}`)}>
          <span style={{ fontFamily: Font.mono, fontSize: "12px", color: Color.muted }}>@{user.username}</span>
          <Avatar src={user.avatar} display={user.display} size={28} />
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          style={{
            fontFamily: Font.mono,
            fontSize: "12px",
            color: Color.text,
            background: "transparent",
            border: `1px solid ${Color.border}`,
            borderRadius: Radius.pill,
            padding: "6px 14px",
            cursor: "pointer",
          }}
        >
          join
        </button>
      )}
    </header>
  );
}
