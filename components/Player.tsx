import React, { useEffect, useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  StyleSheet,
  Text,
} from "react-native";

type Position = {
  x: number;
  y: number;
};

type PlayerProps = {
  id: string;
  number: number;
  position: Position;
  onDragEnd: (id: string, x: number, y: number) => void;
  onDoubleTap: (id: string) => void;
};

export default function Player({
  id,
  number,
  position,
  onDragEnd,
  onDoubleTap,
}: PlayerProps) {
  const pan = useRef(new Animated.ValueXY({ x: position.x, y: position.y }))
    .current;

  const lastTap = useRef<number | null>(null);
  const tapTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    pan.setValue({ x: position.x, y: position.y });
  }, [position.x, position.y]);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      // double tap detected
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
        tapTimeout.current = null;
      }
      onDoubleTap(id);
    } else {
      tapTimeout.current = setTimeout(() => {
        tapTimeout.current = null;
      }, 300);
    }
    lastTap.current = now;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any).__getValue(),
          y: (pan.y as any).__getValue(),
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (
        e: GestureResponderEvent,
        gestureState
      ) => {
        pan.flattenOffset();
        onDragEnd(id, (pan.x as any).__getValue(), (pan.y as any).__getValue());

        // Detect tap vs drag by checking gesture movement distance
        if (
          Math.abs(gestureState.dx) < 5 &&
          Math.abs(gestureState.dy) < 5
        ) {
          handleTap();
        }
      },
    })
  ).current;

  const radius = 25;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.player,
        {
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          transform: pan.getTranslateTransform(),
        },
      ]}
    >
      <Text style={styles.number}>{number}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  player: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  number: {
    color: "white",
    fontWeight: "bold",
  },
});
