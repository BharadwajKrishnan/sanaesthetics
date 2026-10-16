import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRASS, CREAM, FOREST_DEEP, INK, Knot, MAROON } from "@/lib/og";
import { site } from "@/lib/site";

// The picture shown when a link to the site is shared: the kolam knot, the wordmark and the tagline,
// in the site's own colours. Generated once at build time.

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const cormorant = await readFile(join(process.cwd(), "app/fonts/CormorantGaramond-SemiBold.ttf"));

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: CREAM,
          color: INK,
          fontFamily: "Cormorant Garamond",
        }}
      >
        <div style={{ width: 22, height: "100%", background: MAROON, display: "flex" }} />
        <div style={{ position: "absolute", top: 36, right: 36, display: "flex", opacity: 0.55 }}>
          <Knot size={120} strokeWidth={1.8} />
        </div>
        <div style={{ position: "absolute", bottom: 36, right: 36, display: "flex", opacity: 0.55 }}>
          <Knot size={120} strokeWidth={1.8} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 96px 0 86px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Knot size={132} />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 28, color: FOREST_DEEP, fontSize: 92, lineHeight: 0.95 }}>
              <span>{site.wordmark[0]}</span>
              <span>{site.wordmark[1]}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 44, color: BRASS }}>
            <div style={{ width: 120, height: 2, background: BRASS, opacity: 0.6, display: "flex" }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, background: BRASS, marginLeft: 14, display: "flex" }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, background: BRASS, marginLeft: 8, display: "flex" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, border: `2px solid ${BRASS}`, marginLeft: 8, display: "flex" }} />
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 50, color: MAROON, lineHeight: 1.1 }}>{site.tagline}</div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 30, color: INK, opacity: 0.7 }}>{site.domain}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Cormorant Garamond", data: cormorant, weight: 600, style: "normal" }] },
  );
}
