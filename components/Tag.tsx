// Small uppercase label, used the way a recipe site tags its cards.
export function Tag({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "leaf" | "outline" }) {
  const styles = {
    ink: "bg-ink text-cream",
    leaf: "bg-leaf text-ink",
    outline: "border border-current",
  };
  return (
    <span className={`inline-block px-2 py-1 text-[0.68rem] font-semibold uppercase leading-none tracking-[0.12em] ${styles[tone]}`}>
      {children}
    </span>
  );
}
