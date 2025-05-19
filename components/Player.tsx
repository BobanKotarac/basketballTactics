import React, { useEffect, useRef } from "react";
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { Position } from "../types";

interface PlayerProps {
  id: string;
  number: number;
  position: Position;
  radius?: number;
  onDragEnd: (id: string, x: number, y: number) => void;
  onPress?: () => void;  // add optional onPress prop
  isSelected?: boolean;  // add this prop
}

const Player: React.FC<PlayerProps> = ({
  id,
  number,
  position,
  radius = 20,
  onDragEnd,
  onPress,
  isSelected = false, // default false
}) => {
  const pan = useRef(new Animated.ValueXY({ x: position.x, y: position.y })).current;

  useEffect(() => {
    pan.setValue({ x: position.x, y: position.y });
  }, [position.x, position.y]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        onDragEnd(id, pan.x._value, pan.y._value);
      },
    })
  ).current;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ position: "absolute", left: 0, top: 0 }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.player,
          {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: isSelected ? "green" : "blue",
            transform: pan.getTranslateTransform(),
          },
        ]}
      >
        <Text style={styles.playerNumber}>{number}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  player: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  playerNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Player;
