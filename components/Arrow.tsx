import React from 'react';
import Svg, { Line, Polygon } from 'react-native-svg';
import type { Position } from '../types';

interface ArrowProps {
  start: Position;
  end: Position;
  color?: string;
}

const Arrow: React.FC<ArrowProps> = ({ start, end, color = 'black' }) => {
  const arrowHeadSize = 10;
  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  return (
    <Svg>
      <Line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth="2"
      />
      <Polygon
        points={`0,0 ${-arrowHeadSize},${arrowHeadSize/2} ${-arrowHeadSize},${-arrowHeadSize/2}`}
        fill={color}
        transform={`translate(${end.x}, ${end.y}) rotate(${angle * (180 / Math.PI)})`}
      />
    </Svg>
  );
};

export default Arrow;