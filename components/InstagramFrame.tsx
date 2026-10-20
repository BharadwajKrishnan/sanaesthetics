"use client";

import { useState } from "react";
import { setConsent, useConsent } from "@/lib/consent";

// An Instagram post's frame, loaded only once the visitor has allowed it: for every post through the cookie notice,
// or for this one post with the button in its place. Until then nothing is fetched from Meta, and the server
// renders the placeholder, so a visitor without JavaScript still gets the caption's link to the post.
export function InstagramFrame({ src, title, tall }: { src: string; title: string; tall: boolean }) {
  const { choice } = useConsent();
  const [shown, setShown] = useState(false);
  const height = tall ? "h-[600px]" : "h-[500px]";
  if (choice === "all" || shown) {
    return <iframe src={src} title={title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" className={`block w-full ${height}`} />;
  }
  return (
    <div className={`flex ${height} flex-col items-center justify-center gap-4 bg-parchment px-6 text-center`}>
      <p className="max-w-xs text-[0.95rem] leading-relaxed text-ink/75">
        This post is shown in a frame from Instagram. Loading it lets Meta see your IP address and set its own cookies.
      </p>
      <button
        type="button"
        onClick={() => setShown(true)}
        className="btn-sheen rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
      >
        Show this post
      </button>
      <button type="button" onClick={() => setConsent("all")} className="text-sm underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
        Always show Instagram posts
      </button>
    </div>
  );
}
