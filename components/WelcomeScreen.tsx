// components/WelcomeScreen.tsx

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type WelcomeScreenProps = {
  onDismiss: () => void;
};

export default function WelcomeScreen({ onDismiss }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏀 Welcome to Basketball Tactics! 🏀</Text>
      <Text style={styles.subtext}>
        Design plays, position players, and add arrows to show movement. Let&apos;s get started.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onDismiss}>
        <Text style={styles.buttonText}>Go to My Plays</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#444",
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
