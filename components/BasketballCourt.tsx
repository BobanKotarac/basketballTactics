// BasketballCourt.tsx
import React, { JSX, useState } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import CourtBackground from './CourtBackground';
import Player from './Player';

interface PlayerType {
  id: string;
  x: number;
  y: number;
}

export default function BasketballCourt(): JSX.Element {
  const [players, setPlayers] = useState<PlayerType[]>([]);

  const addPlayer = () => {
    const id = Date.now().toString();
    setPlayers([...players, { id, x: 100, y: 100 }]);
  };

  const handleAddPlayer = (event: GestureResponderEvent) => {
    event.preventDefault();
    addPlayer();
  };

  return (
    <View style={styles.container}>
      <CourtBackground>
        {players.map(player => (
          <Player key={player.id} id={player.id} x={player.x} y={player.y} />
        ))}
      </CourtBackground>

      <Pressable style={styles.button} onPress={handleAddPlayer}>
        <Text style={styles.buttonText}>+ Player</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
