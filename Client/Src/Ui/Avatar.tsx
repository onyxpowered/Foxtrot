import { Color } from "./Token.ts";

interface Props {
  src?: string | null;
  display: string;
  size?: number;
  nsfw?: boolean;
}

export function Avatar({ src, display, size = 36, nsfw = false }: Props) {
  const initials = display.slice(0, 2).toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        background: Color.surfaceHi,
        border: `1px solid ${Color.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: size * 0.36,
        color: Color.muted,
        fontWeight: 500,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={display}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: nsfw ? "blur(8px)" : undefined }}
        />
      ) : (
        initials
      )}
    </div>
  );
}
