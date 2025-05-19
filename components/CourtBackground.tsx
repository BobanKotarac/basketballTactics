// components/CourtBackground.tsx
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';

const courtImage = require('../assets/court.jpg');

export default function CourtBackground({ children }: { children: React.ReactNode }) {
  const { width } = Dimensions.get('window');
  const height = width * (50 / 94); // Maintain court aspect ratio

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
  container: {},
  overlay: {
    flex: 1,
  },
});
