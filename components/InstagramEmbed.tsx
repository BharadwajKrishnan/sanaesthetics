import type { InstagramItem } from "@/lib/instagram";

export function InstagramEmbed({ item, accent }: { item: InstagramItem; accent: string }) {
  const url = `https://www.instagram.com/${item.kind === "reel" ? "reel" : "p"}/${item.id}/`;
  return (
    <figure className="flex flex-col">
      <div className="hard-shadow overflow-hidden rounded-2xl border-[6px] bg-white" style={{ borderColor: accent }}>
        {item.src ? (
          <video src={item.src} controls playsInline preload="metadata" className="block aspect-[9/16] w-full bg-indigo object-cover" />
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
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-display text-2xl text-indigo underline-offset-4 hover:underline">
          {item.title}
        </a>
        <p className="mt-1 leading-relaxed text-indigo/75">{item.note}</p>
      </figcaption>
    </figure>
  );
}
