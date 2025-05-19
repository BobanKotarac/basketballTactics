import React from 'react';
import { Rect } from 'react-native-svg';
import type { Position } from '../types';

interface BlockProps {
  position: Position;
  size?: number;
  color?: string;
}

const BlockAnnotation: React.FC<BlockProps> = ({ 
  position, 
  size = 30, 
  color = 'rgba(255,0,0,0.3)' 
}) => {
  return (
    <Rect
      x={position.x - size/2}
      y={position.y - size/2}
      width={size}
      height={size}
      fill={color}
      rx="5"
    />
  );
};

export default BlockAnnotation;