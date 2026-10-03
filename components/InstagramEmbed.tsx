import type { InstagramItem } from "@/lib/instagram";

export function InstagramEmbed({ item }: { item: InstagramItem }) {
  const url = `https://www.instagram.com/${item.kind === "reel" ? "reel" : "p"}/${item.id}/`;
  return (
    <figure className="flex flex-col">
      <div className="overflow-hidden rounded-2xl border border-ink/15 bg-white">
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
      <figcaption className="mt-3">
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-display text-xl text-ink underline-offset-4 hover:underline">
          {item.title}
        </a>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">{item.note}</p>
      </figcaption>
    </figure>
  );
}
