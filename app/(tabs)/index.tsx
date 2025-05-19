// app/(tabs)/index.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import Arrow from "../../components/Arrow";
import CourtBackground from "../../components/CourtBackground";
import Player from "../../components/Player";
import type { PlayerData } from "../../types/index";

const STORAGE_KEY = "@basketball_tactics";
const ANIMATION_KEY = "@basketball_animations";

type AnimationFrame = {
  timestamp: number;
  players: PlayerData[];
};

type Animation = {
  name: string;
  frames: AnimationFrame[];
};

export default function TacticsScreen() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [currentAnimationName, setCurrentAnimationName] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Load saved players and animations on mount
  useEffect(() => {
    (async () => {
      const savedPlayers = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPlayers) setPlayers(JSON.parse(savedPlayers));

      const savedAnims = await AsyncStorage.getItem(ANIMATION_KEY);
      if (savedAnims) setAnimations(JSON.parse(savedAnims));
    })();
  }, []);

  // Save players when updated
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  // Save animations when updated
  useEffect(() => {
    AsyncStorage.setItem(ANIMATION_KEY, JSON.stringify(animations));
  }, [animations]);

  // Record frames every 500ms if recording
  useEffect(() => {
    if (!isRecording || !currentAnimationName) return;

    const interval = setInterval(() => {
      setAnimations((prev) => {
        const animIndex = prev.findIndex((a) => a.name === currentAnimationName);
        if (animIndex === -1) return prev;

        const newFrames = [...prev[animIndex].frames, { timestamp: Date.now(), players: [...players] }];
        const newAnimations = [...prev];
        newAnimations[animIndex] = { ...prev[animIndex], frames: newFrames };
        return newAnimations;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isRecording, currentAnimationName, players]);

  const addPlayer = () => {
    const newId = (players.length + 1).toString();
    setPlayers((prev) => [
      ...prev,
      {
        id: newId,
        number: prev.length + 1,
        position: { x: 50, y: 50 + prev.length * 40 },
      },
    ]);
  };

  const handleSelectPlayer = (id: string) => {
    setSelectedPlayerId(id === selectedPlayerId ? null : id);
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, position: { x, y } } : p))
    );
  };

  const handleDeletePlayer = (id: string) => {
    Alert.alert(
      "Delete Player",
      "Are you sure you want to delete this player?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPlayers((prev) => prev.filter((p) => p.id !== id));
          },
        },
      ]
    );
  };

  const addAnimation = (name: string) => {
    if (animations.find((a) => a.name === name)) {
      Alert.alert("Animation exists", "Please choose a different name.");
      return;
    }
    setAnimations((prev) => [...prev, { name, frames: [] }]);
    setCurrentAnimationName(name);
  };

  const playAnimation = (animationName: string) => {
    const animation = animations.find((a) => a.name === animationName);
    if (!animation || animation.frames.length === 0) return;

    animation.frames.forEach((frame, i) => {
      setTimeout(() => {
        setPlayers(frame.players);
      }, i * 500);
    });
  };

  const selectAnimation = () => {
    if (animations.length === 0) {
      Alert.alert("No animations", "No animations saved yet.");
      return;
    }
    const names = animations.map((a) => a.name);
    Alert.prompt(
      "Select Animation",
      `Available: ${names.join(", ")}`,
      (text) => {
        if (text && animations.find((a) => a.name === text)) {
          setCurrentAnimationName(text);
        } else {
          Alert.alert("Invalid selection", "Animation not found.");
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Add Player" onPress={addPlayer} />
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={() => {
          if (isRecording) setIsRecording(false);
          else {
            Alert.prompt(
              "New Animation Name",
              "Enter a name for this animation:",
              (text) => {
                if (text) addAnimation(text);
                setIsRecording(true);
              }
            );
          }
        }}
      />
      <Button
        title="Play Animation"
        disabled={!currentAnimationName}
        onPress={() => currentAnimationName && playAnimation(currentAnimationName)}
      />
      <Button title="Select Animation" onPress={selectAnimation} />
      <CourtBackground>
        {players.map((player) => (
          <Player
            key={player.id}
            id={player.id}
            number={player.number}
            position={player.position}
            onDragEnd={handleDragEnd}
            onDoubleTap={handleDeletePlayer}
          />
        ))}
        {selectedPlayerId &&
          players
            .filter((p) => p.id !== selectedPlayerId)
            .map((p) => {
              const start = players.find((pl) => pl.id === selectedPlayerId)?.position;
              const end = p.position;
              if (!start) return null;
              return (
                <Arrow
                  key={`${selectedPlayerId}->${p.id}`}
                  start={start}
                  end={end}
                  color="green"
                />
              );
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
