export const Color = {
  bg:         "#0C0C0C",
  surface:    "#161616",
  surfaceHi:  "#1F1F1F",
  border:     "rgba(255,255,255,0.08)",
  text:       "#F0F0F0",
  muted:      "rgba(240,240,240,0.45)",
  accent:     "#E8E8E8",
  danger:     "#FF4D4D",
} as const;

export const Radius = {
  sm:   "8px",
  md:   "16px",
  lg:   "24px",
  xl:   "32px",
  pill: "999px",
} as const;

export const Font = {
  sans:  `"Inter", system-ui, sans-serif`,
  mono:  `"Geist Mono", monospace`,
  display: `"Inter Display", "Inter", sans-serif`,
} as const;

export const Space = {
  "1":  "4px",
  "2":  "8px",
  "3":  "12px",
  "4":  "16px",
  "5":  "20px",
  "6":  "24px",
  "8":  "32px",
  "10": "40px",
  "12": "48px",
} as const;

export const Type = {
  xs:   { fontSize: "11px", lineHeight: "16px" },
  sm:   { fontSize: "13px", lineHeight: "20px" },
  base: { fontSize: "15px", lineHeight: "24px" },
  lg:   { fontSize: "17px", lineHeight: "26px" },
  xl:   { fontSize: "22px", lineHeight: "30px" },
  "2xl":{ fontSize: "28px", lineHeight: "36px" },
} as const;
