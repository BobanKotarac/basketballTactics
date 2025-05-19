import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Arrow from "../../components/Arrow";
import CourtBackground from "../../components/CourtBackground";
import Player from "../../components/Player";
import type { PlayerData } from "../../types/index";

const STORAGE_KEY = "@basketball_tactics";

export default function TacticsScreen() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPlayers(JSON.parse(saved));
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const addPlayer = () => {
    const newId = (players.length + 1).toString();
    setPlayers((prev) => [
      ...prev,
      {
        id: newId,
        number: prev.length + 1, // make sure number exists
        position: { x: 50, y: 50 + prev.length * 40 },
      },
    ]);
  };

  const handleSelectPlayer = (id: string) => {
    setSelectedPlayerId(id === selectedPlayerId ? null : id);
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, position: { x, y } } : p
      )
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Add Player" onPress={addPlayer} />
      <CourtBackground>
        {players.map((player) => (
          <Player
            key={player.id}
            id={player.id}
            number={player.number}
            position={player.position}
            onDragEnd={handleDragEnd}
            onPress={() => handleSelectPlayer(player.id)}
            isSelected={selectedPlayerId === player.id}
          />
        ))}

        {/* Arrows from selected player to others */}
        {selectedPlayerId &&
          players
            .filter((p) => p.id !== selectedPlayerId)
            .map((p) => {
              const start = players.find((pl) => pl.id === selectedPlayerId)?.position;
              const end = p.position;
              if (!start) return null;
              return <Arrow key={`${selectedPlayerId}->${p.id}`} start={start} end={end} color="green" />;
            })}
      </CourtBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
