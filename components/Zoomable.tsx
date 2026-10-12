"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Lets a reader open a picture full screen, for pictures with text that is too small to read
// in place on a phone. Put it inside the picture's positioned box: it covers the picture with
// an invisible button and adds a small "enlarge" badge in the corner.
//
// Opened, the picture fits the screen. Tapping it zooms in (to 2.5 times the screen width, at
// most 1400px) with the tapped spot kept under the finger, and the reader pans by scrolling;
// tapping again zooms back out. Tapping outside the picture, Close or Escape shuts it.
// The larger files only load once the picture is opened.
export function Zoomable({ src, alt }: { src: string; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  // Where the reader tapped, as fractions of the picture and as a point on screen.
  const anchor = useRef<{ fx: number; fy: number; x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  function show() {
    setZoomed(false);
    setOpen(true);
    dialog.current?.showModal();
  }

  function toggleZoom(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    if (zoomed) {
      setZoomed(false);
      return;
    }
    // The fitted image fills the screen and letterboxes the picture (object-contain), so find
    // where the picture itself sits. A tap in the letterbox closes, like a tap on the backdrop.
    const img = e.currentTarget;
    const box = img.getBoundingClientRect();
    const ratio = img.naturalWidth / img.naturalHeight || 1;
    const width = Math.min(box.width, box.height * ratio);
    const height = width / ratio;
    const left = box.left + (box.width - width) / 2;
    const top = box.top + (box.height - height) / 2;
    const fx = (e.clientX - left) / width;
    const fy = (e.clientY - top) / height;
    if (fx < 0 || fx > 1 || fy < 0 || fy > 1) {
      dialog.current?.close();
      return;
    }
    anchor.current = { fx, fy, x: e.clientX, y: e.clientY };
    setZoomed(true);
  }

  // Once the zoomed picture has its size, scroll so the tapped spot sits where the finger was.
  function keepAnchor(e: React.SyntheticEvent<HTMLImageElement>) {
    const a = anchor.current;
    const box = scroller.current;
    if (!a || !box) return;
    const img = e.currentTarget;
    box.scrollLeft = img.offsetLeft + a.fx * img.offsetWidth - a.x;
    box.scrollTop = img.offsetTop + a.fy * img.offsetHeight - a.y;
    anchor.current = null;
  }

  return (
    <>
      <button type="button" onClick={show} aria-label={`Enlarge picture: ${alt}`} className="group absolute inset-0 cursor-zoom-in">
        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-cream shadow-lg transition-colors group-hover:bg-ink/85">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5M10.5 7.5v6M7.5 10.5h6" />
          </svg>
        </span>
      </button>
      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={() => dialog.current?.close()}
        aria-label={alt}
        className="m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-umber p-0 text-cream backdrop:bg-umber"
      >
        {open && (
          <div ref={scroller} className={`h-full w-full ${zoomed ? "overflow-auto" : "p-3 pb-14 pt-16 sm:px-10"}`}>
            {zoomed ? (
              <Image
                key="zoomed"
                src={src}
                alt={alt}
                width={0}
                height={0}
                sizes="(min-width: 560px) 1400px, 250vw"
                quality={90}
                onLoad={keepAnchor}
                onClick={toggleZoom}
                className="block h-auto w-[min(250vw,1400px)] max-w-none cursor-zoom-out"
              />
            ) : (
              <div className="relative h-full w-full">
                <Image
                  key="fit"
                  src={src}
                  alt={alt}
                  fill
                  sizes="100vw"
                  quality={90}
                  onClick={toggleZoom}
                  className="cursor-zoom-in object-contain"
                />
              </div>
            )}
          </div>
        )}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-4 text-center">
          <span className="inline-block rounded-full bg-ink/80 px-4 py-1.5 text-sm text-cream">{zoomed ? "Tap the picture to zoom out" : "Tap the picture to zoom in"}</span>
        </div>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="absolute right-3 top-3 rounded-full bg-cream px-4 py-2 text-sm font-medium text-ink shadow-lg hover:bg-parchment"
        >
          Close
        </button>
      </dialog>
    </>
  );
}
