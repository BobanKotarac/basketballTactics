// components/TacticsEditor.tsx

import React, { useState } from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import uuid from "react-native-uuid"; // for generating unique IDs
import ArrowPath from "./ArrowPath";
import CourtBackground from "./BasketballCourt";
import PlayerToken from "./PlayerToken";

type Point = { x: number; y: number };

export default function TacticsEditor() {
  // 1) Existing players on court
  const [players, setPlayers] = useState<
    { id: string; x: number; y: number }[]
  >([]);

  // 2) Completed arrows (each arrow is an array of points)
  const [arrows, setArrows] = useState<Point[][]>([]);

  // 3) “Currently drawing” arrow points
  const [currentArrow, setCurrentArrow] = useState<Point[]>([]);

  // Whether we’re in “drawing mode” vs “placing mode”
  const [mode, setMode] = useState<"placePlayer" | "drawArrow">("placePlayer");

  // Handle court taps
  const onCourtPress = (evt: GestureResponderEvent) => {
    const { locationX, locationY } = evt.nativeEvent;

    if (mode === "placePlayer") {
      // Add a new player
      const newId = uuid.v4().toString();
      setPlayers((prev) => [...prev, { id: newId, x: locationX - 20, y: locationY - 20 }]);
    } else if (mode === "drawArrow") {
      // If this is the first tap in a new arrow, start a new arrow
      if (currentArrow.length === 0) {
        setCurrentArrow([{ x: locationX, y: locationY }]);
      } else {
        // On second tap, finalize arrow
        setCurrentArrow((prev) => [...prev, { x: locationX, y: locationY }]);
        // Add to completed arrows
        setArrows((prev) => [...prev, [...currentArrow, { x: locationX, y: locationY }]]);
        setCurrentArrow([]); // ready for next arrow
      }
    }
  };

  // Handle player drag → update position
  const handlePlayerDrag = (id: string, x: number, y: number) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x: x - 20, y: y - 20 } : p))
    );
  };

  // Switch modes with a simple toggle (you can replace with buttons in UI)
  const toggleMode = () => {
    setMode((prev) => (prev === "placePlayer" ? "drawArrow" : "placePlayer"));
    // Clear any half‐drawn arrow if switching mode
    setCurrentArrow([]);
  };

  return (
    <View style={styles.editorContainer}>
      {/* Mode toggle (for demo, tapping court with 2 fingers toggles) */}
      {/* You can replace with a header button or bottom toolbar */}
      <TouchableWithoutFeedback onLongPress={toggleMode}>
        <View style={styles.modeIndicator}>
          {mode === "placePlayer" ? "Tap to place players" : "Tap twice to draw arrow"}
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onCourtPress}>
        <View>
          <CourtBackground>
            {/* Render completed arrows first (so they appear under players) */}
            {arrows.map((pts, idx) => (
              <ArrowPath key={`arrow-${idx}`} points={pts} />
            ))}

            {/* If user is mid‐drawing an arrow, show it (in-progress) */}
            {currentArrow.length > 0 && <ArrowPath points={currentArrow} />}

            {/* Render each player */}
            {players.map((p) => (
              <PlayerToken
                key={p.id}
                id={p.id}
                initialX={p.x}
                initialY={p.y}
                onPositionChange={(id, newX, newY) => handlePlayerDrag(id, newX, newY)}
              />
            ))}
          </CourtBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  editorContainer: {
    flex: 1,
    backgroundColor: "#eee",
  },
  modeIndicator: {
    textAlign: "center",
    padding: 8,
    backgroundColor: "#222",
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
});
