// components/ArrowPath.tsx

import React from "react";
import { G, Path, Polygon, Svg } from "react-native-svg";

type ArrowPathProps = {
  points: { x: number; y: number }[];   // array of points defining polyline
  color?: string;
  strokeWidth?: number;
};

export default function ArrowPath({
  points,
  color = "#FF0000",
  strokeWidth = 3,
}: ArrowPathProps) {
  if (points.length < 2) {
    return null; // Need at least two points to draw a line
  }

  // Build an "M x1 y1 L x2 y2 L x3 y3 ..." string
  const d = points
    .map((pt, i) => (i === 0 ? `M${pt.x},${pt.y}` : `L${pt.x},${pt.y}`))
    .join(" ");

  // Compute arrowhead at end (last two points)
  const [penultimate, last] = [
    points[points.length - 2],
    points[points.length - 1],
  ];
  // Simple vector from penultimate -> last
  const vx = last.x - penultimate.x;
  const vy = last.y - penultimate.y;
  // Normalize to length 1, then scale
  const len = Math.sqrt(vx * vx + vy * vy) || 1;
  const ux = vx / len;
  const uy = vy / len;
  // Perpendicular vector
  const perpX = -uy;
  const perpY = ux;
  // Arrowhead base width and length
  const arrowLen = 12;
  const arrowWidth = 6;
  // Tip = last
  const tipX = last.x;
  const tipY = last.y;
  // Base point (back from tip)
  const baseX = tipX - ux * arrowLen;
  const baseY = tipY - uy * arrowLen;
  // Two corners of arrowhead
  const corner1X = baseX + perpX * arrowWidth;
  const corner1Y = baseY + perpY * arrowWidth;
  const corner2X = baseX - perpX * arrowWidth;
  const corner2Y = baseY - perpY * arrowWidth;

  // Assemble SVG of size large enough to cover all points
  // For simplicity, assume the parent (CourtBackground) is sized exactly,
  // so use width: 100%, height: 100% in styling.
  return (
    <Svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <Path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G>
        <Polygon
          points={`${tipX},${tipY} ${corner1X},${corner1Y} ${corner2X},${corner2Y}`}
          fill={color}
        />
      </G>
    </Svg>
  );
}
