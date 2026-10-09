import Image from "next/image";
import { dabbaCutout } from "@/lib/photos";
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

// The photographed spice box when there is one, otherwise the drawn one.
export function Dabba({ className = "", alt = "", sizes, priority }: { className?: string; alt?: string; sizes: string; priority?: boolean }) {
  if (!dabbaCutout) return <BrassDabba className={className} />;
  return (
    <Image
      src={dabbaCutout}
      alt={alt}
      width={848}
      height={848}
      sizes={sizes}
      priority={priority}
      className={`aspect-square rounded-full drop-shadow-[0_2rem_2.5rem_rgb(10_6_3/0.7)] ${className}`}
    />
  );
}
