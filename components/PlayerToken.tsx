// components/PlayerToken.tsx

import React, { useRef } from "react";
import {
    GestureResponderEvent,
    Image,
    PanResponder,
    PanResponderGestureState,
    StyleSheet,
    ViewStyle,
} from "react-native";

// Replace with your player‐icon.png (a small circle or silhouette)
const playerIcon = require("../assets/player-icon.png");

type PlayerTokenProps = {
  id: string;                              // unique ID for this player
  initialX: number;                        // starting X (in px relative to court)
  initialY: number;                        // starting Y (in px)
  onPositionChange: (id: string, x: number, y: number) => void;
  style?: ViewStyle;
};

export default function PlayerToken({
  id,
  initialX,
  initialY,
  onPositionChange,
  style,
}: PlayerTokenProps) {
  const pan = useRef({
    x: initialX,
    y: initialY,
  }).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_e: GestureResponderEvent, _gestureState: PanResponderGestureState) => {
        // Nothing special on grant
      },
      onPanResponderMove: (_e, gestureState) => {
        // Update pan.x / pan.y in real time
        pan.x = initialX + gestureState.dx;
        pan.y = initialY + gestureState.dy;
        onPositionChange(id, pan.x, pan.y);
      },
      onPanResponderRelease: (_e, _gestureState) => {
        // Nothing else—final position is already reported via onPanResponderMove
      },
    })
  ).current;

  return (
    <Image
      source={playerIcon}
      {...panResponder.panHandlers}
      style={[
        {
          position: "absolute",
          left: pan.x,
          top: pan.y,
          width: 40,
          height: 40,
          zIndex: 2,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  // empty if inline styles suffice
});
