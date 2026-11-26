import type { CSSProperties } from "react";
import { Color, Radius, Font } from "./Token.ts";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  style?: CSSProperties;
}

export function Input({ value, onChange, placeholder, type = "text", style }: Props) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: Color.surfaceHi,
        border: `1px solid ${Color.border}`,
        borderRadius: Radius.sm,
        color: Color.text,
        fontFamily: Font.sans,
        fontSize: "14px",
        padding: "10px 14px",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
        ...style,
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = Color.border)}
    />
  );
}
