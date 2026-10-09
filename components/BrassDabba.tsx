import { POSITIONS, SPICES } from "@/lib/spices";

// A still, decorative anjarapetti for artwork slots. SpiceBox is the interactive one.
// Pass a positioning class (e.g. absolute): the bowls are placed inside it.
export function BrassDabba({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`dabba aspect-square rounded-full ${className}`}>
      {SPICES.map((s, i) => (
        <span
          key={s.name}
          className="bowl absolute aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: `${POSITIONS[i].left.toFixed(2)}%`, top: `${POSITIONS[i].top.toFixed(2)}%`, ["--spice" as string]: s.color }}
        />
      ))}
    </div>
  );
}
