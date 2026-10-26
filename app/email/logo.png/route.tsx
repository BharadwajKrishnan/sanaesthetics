import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CREAM, FOREST_DEEP, Knot } from "@/lib/og";
import { site } from "@/lib/site";

// The logo for emails and the email signature: the kolam knot beside the two-line wordmark, on cream,
// at twice its display size so it stays crisp. Served at /email/logo.png and generated once at build time.
export const dynamic = "force-static";

const WIDTH = 720;
const HEIGHT = 200;

export async function GET() {
  const cormorant = await readFile(join(process.cwd(), "app/fonts/CormorantGaramond-SemiBold.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: CREAM, padding: "0 24px", fontFamily: "Cormorant Garamond" }}>
        <Knot size={152} strokeWidth={2.4} />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 26, color: FOREST_DEEP, fontSize: 80, lineHeight: 0.95, letterSpacing: -0.5 }}>
          <span>{site.wordmark[0]}</span>
          <span>{site.wordmark[1]}</span>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT, fonts: [{ name: "Cormorant Garamond", data: cormorant, weight: 600, style: "normal" }] },
  );
}
