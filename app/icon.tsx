import { ImageResponse } from "next/og";
import { CREAM, Knot } from "@/lib/og";

// The browser-tab icon: the kolam knot in brass on cream.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: CREAM, borderRadius: 12 }}>
        <Knot size={58} strokeWidth={4} />
      </div>
    ),
    size,
  );
}
