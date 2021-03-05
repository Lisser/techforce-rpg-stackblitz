import { BoardInterface, Obstacles } from "./interfaces";

export const gridSize = 10;
export const tileSize = 25;

export const initialBoard: BoardInterface = {
  rows: [
    {
      cells: [
        { userId: "", obstacle: null },
        { userId: "", obstacle: null },
        { userId: "", obstacle: null },
        { userId: "", obstacle: null },
        { userId: "", obstacle: null }
      ]
    },
    {
      cells: [
        { userId: "", obstacle: null },
        { userId: "", obstacle: Obstacles.ROCK },
        { userId: "", obstacle: null },
        { userId: "", obstacle: Obstacles.ROCK },
        { userId: "", obstacle: null }
      ]
    },
    {
      cells: [
        { userId: "", obstacle: null },
        { userId: "", obstacle: null },
        { userId: "42", obstacle: null },
        { userId: "", obstacle: null },
        { userId: "", obstacle: null }
      ]
    },
    {
      cells: [
        { userId: "", obstacle: null },
        { userId: "", obstacle: Obstacles.ROCK },
        { userId: "", obstacle: null },
        { userId: "", obstacle: Obstacles.ROCK },
        { userId: "", obstacle: null }
      ]
    },
    {
      cells: [
        { userId: "", obstacle: null },
        { userId: "", obstacle: null },
        { userId: "", obstacle: null },
        { userId: "", obstacle: null },
        { userId: "", obstacle: null }
      ]
    }
  ]
};
