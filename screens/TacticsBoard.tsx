// screens/TacticsBoard.tsx
import { Text, View } from 'react-native';
import { usePlayers } from '../context/PlayersContext';

export default function TacticsBoard() {
  const { players } = usePlayers();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Tactics Board</Text>
      <Text>Players:</Text>
      {players.map((player) => (
        <Text key={player.id}>{player.name}</Text>
      ))}
    </View>
  );
}