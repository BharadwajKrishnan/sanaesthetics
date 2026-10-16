import { knotGeometry } from "@/components/Kolam";

// Pieces shared by the generated images (social card and icons). Satori, which draws them, only accepts
// plain SVG elements inside <svg>, so the knot is spelled out here rather than reusing KolamKnot.

export const CREAM = "#f7f2eb";
export const INK = "#2b2521";
export const FOREST_DEEP = "#1f3627";
export const MAROON = "#7b2d26";
export const BRASS = "#b98a44";

export function Knot({ size, strokeWidth = 2.2, color = BRASS }: { size: number; strokeWidth?: number; color?: string }) {
  const g = knotGeometry(100);
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <path d={g.outer} />
      <path d={g.inner} />
      <path d={g.diamond} strokeLinejoin="round" />
      {g.dots.map((dot) => (
        <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={dot.r} fill={color} stroke="none" />
      ))}
    </svg>
  );
}
