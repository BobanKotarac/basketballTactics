// components/WelcomeScreen.tsx
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Props {
  onPressStart?: () => void;
}

export default function WelcomeScreen({ onPressStart }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏀 Basketball Tactics</Text>
      <Text style={styles.subtitle}>
        Welcome! Let’s get you started.
      </Text>
      <Button
        title="Get Started"
        onPress={onPressStart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
});
