import React, { useRef } from 'react';
import { PanResponder } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import Svg, { Circle, Text } from 'react-native-svg';
import type { PlayerPosition, Position } from '../types';

interface PlayerProps {
  player: PlayerPosition;
  isSelected: boolean;
  onDrag: (position: Position) => void;
  onSelect: () => void;
}

const Player: React.FC<PlayerProps> = ({ 
  player, 
  isSelected, 
  onDrag, 
  onSelect 
}) => {
  const position = useSharedValue<Position>({ x: player.x, y: player.y });
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        position.value = {
          x: player.x + gesture.dx,
          y: player.y + gesture.dy
        };
      },
      onPanResponderRelease: () => {
        onDrag(position.value);
      }
    })
  ).current;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.value.x },
      { translateY: position.value.y }
    ]
  }));

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[animatedStyle, { position: 'absolute' }]}
      onTouchStart={onSelect}
    >
      <Svg>
        <Circle
          cx={0}
          cy={0}
          r="20"
          fill={isSelected ? 'darkblue' : 'blue'}
          stroke="white"
          strokeWidth="2"
        />
        <Text
          x={0}
          y={0}
          fill="white"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {player.number}
        </Text>
      </Svg>
    </Animated.View>
  );
};

export default Player;