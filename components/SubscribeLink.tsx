"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// A link to the subscribe band on the homepage. On the homepage itself it scrolls there by hand,
// because <Link> does nothing when the address already ends in /#subscribe (a second tap, or a shared link).
export function SubscribeLink({ onClick, ...props }: Omit<React.ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      href="/#subscribe"
      onClick={(e) => {
        onClick?.(e);
        const band = pathname === "/" ? document.getElementById("subscribe") : null;
        if (!band) return;
        e.preventDefault();
        band.scrollIntoView();
        history.replaceState(null, "", "#subscribe");
      }}
    />
  );
}
