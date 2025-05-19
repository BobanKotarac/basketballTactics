import { Position } from '@/types';
import { SharedValue, withTiming } from 'react-native-reanimated';

export const animatePlayerMovement = (
  position: SharedValue<Position>,
  target: Position,
  duration: number
) => {
  position.value = {
    x: withTiming(target.x, { duration }),
    y: withTiming(target.y, { duration })
  };
};

export const animatePass = (
  ballPosition: SharedValue<Position>,
  from: Position,
  to: Position,
  duration: number
) => {
  ballPosition.value = {
    x: withTiming(from.x, { duration: 0 }),
    y: withTiming(from.y, { duration: 0 })
  };
  
  ballPosition.value = {
    x: withTiming(to.x, { duration }),
    y: withTiming(to.y, { duration })
  };
};