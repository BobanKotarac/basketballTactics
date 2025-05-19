export type Position = { x: number; y: number };
export type PlayerPosition = { number: number } & Position;
export type Movement = { positions: PlayerPosition[]; duration: number };
export type Pass = { from: number; to: number; positions: Position[] };
export type Block = { player: number; position: Position };
export type Play = {
  players: PlayerPosition[];
  passes: Pass[];
  blocks: Block[];
  movements: Movement[];
};