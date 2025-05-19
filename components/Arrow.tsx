// components/Arrow.tsx
import React from "react";
import Svg, { Line, Polygon } from "react-native-svg";
import type { Position } from "../types";

interface ArrowProps {
  start: Position;
  end: Position;
  color?: string;
  strokeWidth?: number;
  arrowHeadSize?: number;
}

const Arrow: React.FC<ArrowProps> = ({
  start,
  end,
  color = "black",
  strokeWidth = 1.5,
  arrowHeadSize = 6,
}) => {
  if (!start || !end) return null;

  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  return (
    <Svg
      style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}
      pointerEvents="none"
    >
      <Line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Polygon
        points={`0,0 ${-arrowHeadSize},${arrowHeadSize / 2} ${-arrowHeadSize},${-arrowHeadSize / 2}`}
        fill={color}
        transform={`translate(${end.x}, ${end.y}) rotate(${angle * (180 / Math.PI)})`}
      />
    </Svg>
  );
};

export default Arrow;
