// screens/AddPlayers.tsx
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { usePlayers } from '../context/PlayersContext';

export default function AddPlayers() {
  const { addPlayer } = usePlayers();
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      addPlayer({ id: Date.now().toString(), name: playerName });
      setPlayerName('');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter player name"
        value={playerName}
        onChangeText={setPlayerName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Player" onPress={handleAddPlayer} />
    </View>
  );
}