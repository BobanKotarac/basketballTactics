import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

/**
 * A simple “DrawCourt” screen placeholder. Eventually,
 * you’ll implement your court‐drawing logic here.
 */
export default function DrawCourt() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Draw a Play</Text>
      <Text style={styles.subtitle}>
        (Here’s where you’ll position players and draw arrows.)
      </Text>
      <Button title="Go Back Home" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#555555',
  },
})
