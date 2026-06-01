import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.72rem",
        fontWeight: 700,
        color: "var(--subtle)",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: "1.5rem",
      }}
    >
      {children}
    </h2>
  );
}