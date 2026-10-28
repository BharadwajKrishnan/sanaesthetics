// Thin line icons in the style of the hero's feature row.
type IconProps = { className?: string };

function Svg({ className = "h-9 w-9", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export function SproutIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 36V18" />
      <path d="M20 22C20 12 12 6 4 6c0 9 7 16 16 16Z" />
      <path d="M20 18c0-8 6-13 14-13 0 8-6 13-14 13Z" />
    </Svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15 4h10M17 4v11L8 32a3 3 0 0 0 2.7 4.4h18.6A3 3 0 0 0 32 32l-9-17V4" />
      <path d="M11.5 26h17" />
      <circle cx="18" cy="31" r="1" />
      <circle cx="23" cy="29" r="1.3" />
    </Svg>
  );
}

export function TempleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 3v3M15 10h10l-1-4h-8l-1 4ZM12 16h16l-2-6H14l-2 6ZM9 23h22l-3-7H12l-3 7Z" />
      <path d="M7 36h26M9 23v13M31 23v13M16 36v-7a4 4 0 0 1 8 0v7" />
    </Svg>
  );
}

export function BowlIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20h32c0 8-7 14-16 14S4 28 4 20Z" />
      <path d="M14 34h12" />
      <path d="M24 20 34 6M28 20l9-9" />
      <path d="M13 15c1-2-1-3 0-5M19 15c1-2-1-3 0-5" />
    </Svg>
  );
}

// The recipe categories, each drawn as the vessel it is served in.

// All recipes: a thali with its small bowls.
export function ThaliIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="20" cy="20" r="16" />
      <circle cx="20" cy="20" r="12.5" strokeDasharray="1 2.6" />
      <circle cx="14" cy="15" r="3.6" />
      <circle cx="24.5" cy="13.5" r="3" />
      <circle cx="22" cy="24.5" r="4.6" />
    </Svg>
  );
}

// Main dish: a kuzhambu pot, steaming.
export function PotIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 18c-2.5 3-3 6.5-2 9.5C8.5 32 13.5 35 20 35s11.5-3 13-7.5c1-3 .5-6.5-2-9.5Z" />
      <path d="M7.5 18h25M11 15h18" />
      <path d="M15 11c1.2-1.8-1-2.6 0-4.6M20 11c1.2-1.8-1-2.6 0-4.6M25 11c1.2-1.8-1-2.6 0-4.6" />
    </Svg>
  );
}

// Festive special: an agal lamp, lit.
export function LampIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 25h28.5l3.5-3c-.5 7-7.5 11-17 11S5.5 30 5 25Z" />
      <path d="M20 25v-3" />
      <path d="M20 6c3 4 4.5 7 4.5 9.5a4.5 4.5 0 0 1-9 0C15.5 13 17 10 20 6Z" />
      <path d="M20 13.5c1 1.4 1.4 2.4 1.4 3.2a1.4 1.4 0 0 1-2.8 0c0-.8.4-1.8 1.4-3.2Z" />
      <path d="M9 9.5l2 2M31 9.5l-2 2M5 17h2.5M35 17h-2.5" />
    </Svg>
  );
}

// Side dish: a kadai, with pieces tossed up off the spatula.
export function KadaiIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 21h30c0 7-6.5 12-15 12S5 28 5 21Z" />
      <path d="M5 21c-2.5 0-3.5-2.5-1.5-3.5M35 21c2.5 0 3.5-2.5 1.5-3.5" />
      <path d="M23 19 33 5.5" />
      <path d="m12.5 13.5 2.3-1.6 1.6 2.3-2.3 1.6ZM17.5 8l2.1-1.2 1.2 2.1-2.1 1.2Z" />
    </Svg>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10h14M12 5l5 5-5 5" />
    </svg>
  );
}
