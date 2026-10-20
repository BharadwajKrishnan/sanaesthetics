import type { InstagramItem } from "@/lib/instagram";
import { InstagramFrame } from "@/components/InstagramFrame";

export function InstagramEmbed({ item }: { item: InstagramItem }) {
  const url = `https://www.instagram.com/${item.kind === "reel" ? "reel" : "p"}/${item.id}/`;
  return (
    <figure className="card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-white shadow-sm shadow-ink/5">
      <div className="border-b border-line/60 bg-white">
        {item.src ? (
          <video src={item.src} controls playsInline preload="metadata" className="block aspect-[9/16] w-full bg-umber object-cover" />
        ) : (
          <InstagramFrame src={`${url}embed/`} title={`${item.title} on Instagram`} tall={item.kind === "reel"} />
        )}
      </div>
      <figcaption className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink/55">{[item.kind, ...(item.tags ?? [])].join(" · ")}</p>
        <p className="mt-1.5 font-serif text-[1.35rem] font-semibold leading-snug">{item.title}</p>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/75">{item.note}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="group mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium text-forest">
          <span className="link-grow">View on Instagram</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </figcaption>
    </figure>
  );
}
