// context/PlayersContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

type Player = {
  id: string;
  name: string;
};

type PlayersContextType = {
  players: Player[];
  addPlayer: (player: Player) => void;
};

const PlayersContext = createContext<PlayersContextType>({
  players: [],
  addPlayer: () => {},
});

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  return (
    <PlayersContext.Provider value={{ players, addPlayer }}>
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayers = () => useContext(PlayersContext);