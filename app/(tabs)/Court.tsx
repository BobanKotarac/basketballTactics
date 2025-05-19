import React from "react";
import Arrow from "../../components/Arrow";
import CourtBackground from "../../components/CourtBackground";
import Player from "../../components/Player";
import type { PlayerData } from "../../types/index";

type CourtProps = {
  players: PlayerData[];
  selectedPlayerId: string | null;
  onSelectPlayer: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
};

export default function Court({
  players,
  selectedPlayerId,
  onSelectPlayer,
  onDragEnd,
}: CourtProps) {
  return (
    <CourtBackground>
      {players.map((player) => (
        <Player
            key={player.id}
            id={player.id}
            number={parseInt(player.id)} // or actual player.number if you have it
            position={player.position}
            onDragEnd={onDragEnd} // your handler function
        />
      
      
      ))}

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
  );
}
