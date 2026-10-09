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

export function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10h14M12 5l5 5-5 5" />
    </svg>
  );
}
