// components/CourtBackground.tsx

import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

const courtImage = require("../assets/court.jpg");

export default function CourtBackground({ children }: { children: React.ReactNode }) {
  const { height } = Dimensions.get("window");
  const width = height * (50 / 94); // Portrait aspect ratio

  return (
    <ImageBackground
      source={courtImage}
      style={[styles.container, { width, height }]}
      resizeMode="stretch"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // width & height set dynamically
    alignSelf: 'center',
  },
  overlay: {
    flex: 1,
    position: "relative",
  },
});
