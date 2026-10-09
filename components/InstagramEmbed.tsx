import type { InstagramItem } from "@/lib/instagram";

export function InstagramEmbed({ item }: { item: InstagramItem }) {
  const url = `https://www.instagram.com/${item.kind === "reel" ? "reel" : "p"}/${item.id}/`;
  return (
    <figure className="flex flex-col">
      <div className="overflow-hidden rounded-sm bg-white shadow-sm">
        {item.src ? (
          <video src={item.src} controls playsInline preload="metadata" className="block aspect-[9/16] w-full bg-umber object-cover" />
        ) : (
          <iframe
            src={`${url}embed/`}
            title={`${item.title} on Instagram`}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            className={`block w-full ${item.kind === "reel" ? "h-[640px]" : "h-[520px]"}`}
          />
        )}
      </div>
      <figcaption className="mt-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">{[item.kind, ...(item.tags ?? [])].join(" · ")}</p>
        <p className="mt-2 font-serif text-2xl font-semibold leading-snug">{item.title}</p>
        <p className="mt-2 leading-relaxed text-ink/75">{item.note}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-forest hover:underline hover:underline-offset-4">
          View on Instagram <span aria-hidden="true">→</span>
        </a>
      </figcaption>
    </figure>
  );
}
