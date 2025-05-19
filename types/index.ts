// types.ts
export interface Position {
    x: number;
    y: number;
  }
  
  export interface PlayerData {
    id: string;
    number: number;
    position: Position;
  }
  
  export interface ArrowData {
    id: string;
    fromPlayerId: string;
    toPlayerId: string;
  }
  