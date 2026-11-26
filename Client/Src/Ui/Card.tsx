import type { CSSProperties, ReactNode } from "react";
import { Color, Radius } from "./Token.ts";

type Size = "sm" | "md" | "lg";

const pad: Record<Size, string> = { sm: "12px", md: "16px", lg: "24px" };
const radius: Record<Size, string> = { sm: Radius.md, md: Radius.lg, lg: Radius.xl };

interface Props {
  children: ReactNode;
  size?: Size;
  onClick?: () => void;
  style?: CSSProperties;
}

export function Card({ children, size = "md", onClick, style }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: Color.surface,
        border: `1px solid ${Color.border}`,
        borderRadius: radius[size],
        padding: pad[size],
        cursor: onClick ? "pointer" : undefined,
        transition: "background 0.15s",
        ...style,
      }}
      onMouseEnter={onClick ? (e) => ((e.currentTarget as HTMLDivElement).style.background = Color.surfaceHi) : undefined}
      onMouseLeave={onClick ? (e) => ((e.currentTarget as HTMLDivElement).style.background = Color.surface) : undefined}
    >
      {children}
    </div>
  );
}
