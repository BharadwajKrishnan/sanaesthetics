import { ImageResponse } from "next/og";
import { CREAM, Knot } from "@/lib/og";

// The home-screen icon on iPhones and iPads. iOS rounds the corners itself.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: CREAM }}>
        <Knot size={150} strokeWidth={2.8} />
      </div>
    ),
    size,
  );
}
