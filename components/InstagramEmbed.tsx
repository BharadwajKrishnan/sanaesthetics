import { Tag } from "@/components/Tag";
import type { InstagramItem } from "@/lib/instagram";

export function InstagramEmbed({ item }: { item: InstagramItem }) {
  const url = `https://www.instagram.com/${item.kind === "reel" ? "reel" : "p"}/${item.id}/`;
  return (
    <figure className="flex flex-col">
      <div className="overflow-hidden bg-white">
        {item.src ? (
          <video src={item.src} controls playsInline preload="metadata" className="block aspect-[9/16] w-full bg-ink object-cover" />
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
        <p className="flex flex-wrap gap-1.5">
          <Tag tone={item.kind === "reel" ? "leaf" : "ink"}>{item.kind}</Tag>
          {item.tags?.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </p>
        <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">{item.title}</p>
        <p className="mt-2 font-serif leading-relaxed text-ink/75">{item.note}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.14em] hover:underline hover:underline-offset-4">
          View on Instagram &gt;
        </a>
      </figcaption>
    </figure>
  );
}
