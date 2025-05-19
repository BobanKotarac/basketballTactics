import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Arrow from '../components/Arrow';
import BlockAnnotation from '../components/BlockAnnotation';
import Court from '../components/Court';
import Player from '../components/Player';
import type { Block, Pass, PlayerPosition, Position } from '../types';

const initialPlayers: PlayerPosition[] = [
  { number: 1, x: 100, y: 100 },
  { number: 2, x: 200, y: 100 },
  { number: 3, x: 150, y: 200 },
  { number: 4, x: 100, y: 300 },
  { number: 5, x: 200, y: 300 },
];

const PlaybookScreen: React.FC = () => {
  const [players, setPlayers] = useState<PlayerPosition[]>(initialPlayers);
  const [passes, setPasses] = useState<Pass[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [currentPassStart, setCurrentPassStart] = useState<Position | null>(null);
  const [mode, setMode] = useState<'move' | 'pass' | 'block'>('move');

  const handlePlayerDrag = (number: number, newPos: Position) => {
    setPlayers(players.map(p => 
      p.number === number ? { ...p, ...newPos } : p
    ));
  };

  const handlePlayerSelect = (number: number) => {
    if (mode === 'pass') {
      if (!currentPassStart) {
        const passer = players.find(p => p.number === number);
        if (passer) setCurrentPassStart({ x: passer.x, y: passer.y });
      } else {
        const receiver = players.find(p => p.number === number);
        if (receiver) {
          const newPass: Pass = {
            from: selectedPlayer!,
            to: number,
            positions: [
              currentPassStart,
              { x: receiver.x, y: receiver.y } // Correctly access position
            ]
          };
          setPasses([...passes, newPass]);
          setCurrentPassStart(null);
        }
      }
    } else if (mode === 'block') {
      const player = players.find(p => p.number === number);
      if (player) {
        setBlocks([...blocks, { 
          player: number, 
          position: { x: player.x, y: player.y } 
        }]);
      }
    }
    setSelectedPlayer(number);
  };

  return (
    <View style={styles.container}>
      <Court>
        {/* Players */}
        {players.map(player => (
          <Player
            key={player.number}
            player={player}
            isSelected={selectedPlayer === player.number}
            onDrag={(pos) => handlePlayerDrag(player.number, pos)}
            onSelect={() => handlePlayerSelect(player.number)}
          />
        ))}

        {/* Pass Arrows */}
        {passes.map((pass, index) => (
          <Arrow
            key={`pass-${index}`}
            start={pass.positions[0]}
            end={pass.positions[1]}
            color="orange"
          />
        ))}

        {/* Block Annotations */}
        {blocks.map((block, index) => (
          <BlockAnnotation
            key={`block-${index}`}
            position={block.position}
          />
        ))}
      </Court>

      <View style={styles.controls}>
        <Button 
          title="Move Mode" 
          onPress={() => setMode('move')} 
          color={mode === 'move' ? 'blue' : 'gray'}
        />
        <Button
          title="Pass Mode"
          onPress={() => setMode('pass')}
          color={mode === 'pass' ? 'orange' : 'gray'}
        />
        <Button
          title="Block Mode"
          onPress={() => setMode('block')}
          color={mode === 'block' ? 'red' : 'gray'}
        />
        <Button
          title="Clear Annotations"
          onPress={() => {
            setPasses([]);
            setBlocks([]);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
});

export default PlaybookScreen;