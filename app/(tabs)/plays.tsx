// app/(tabs)/plays.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
// Import your court and arrow components here
import Arrow from "../../components/Arrow";
import Court from "../../components/Court";
import Player from "../../components/Player";

export default function PlaysScreen() {
  return (
    <View style={styles.container}>
      <Court style={styles.court} />
      {/* Example: position players and arrows */}
      <Player id="player1" x={50} y={100} />
      <Player id="player2" x={150} y={200} />
      <Arrow from={{ x: 50, y: 100 }} to={{ x: 150, y: 200 }} />
      {/* Add your animation hooks / gesture handlers, etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  court: {
    flex: 1,
  },
});
