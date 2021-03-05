enum Obstacles {
  ROCK = 'rock'
}

export interface TileConfig {
  userId: string;
  obstacle: Obstacles | null;
}

type Row = {
  cells: TileConfig[];
};
export interface BoardInterface {
  rows: Row[];
}

export interface BoardCoordinate {
  x: number;
  y: number;
}

export enum MoveDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface Player {
  id: string;
  name: string;
  color: string;
  isAdmin?: boolean;

  health: number;
  attack: number;
  speed: number;
  range: number;
}

export interface PartialPlayer {
  id?: string;
  name?: string;
  color?: string;
  isAdmin?: boolean;
  health?: number;
  attack?: number;
  speed?: number;
  range?: number;
}

export interface PlayerDataStore {
  [key: string]: Player;
}
