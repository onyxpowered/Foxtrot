import type { CSSProperties, ReactNode } from "react";
import { Color, Radius, Font } from "./Token.ts";

type Variant = "primary" | "ghost" | "danger";

const styles: Record<Variant, CSSProperties> = {
  primary: { background: Color.accent,     color: "#0C0C0C", border: "none" },
  ghost:   { background: "transparent",    color: Color.text, border: `1px solid ${Color.border}` },
  danger:  { background: "transparent",    color: Color.danger, border: `1px solid ${Color.danger}` },
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  style?: CSSProperties;
}

export function Button({ children, variant = "primary", onClick, disabled, type = "button", style }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        borderRadius: Radius.pill,
        fontFamily: Font.sans,
        fontSize: "13px",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "opacity 0.15s",
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
