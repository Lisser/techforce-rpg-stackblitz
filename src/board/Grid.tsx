import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { tileSize } from "../common/generalVariables";
import { BoardInterface, Player } from "../common/interfaces";

import Tile from "./Tile";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "grid",
      border: "solid 1px black",
      borderBottomWidth: 0,
      borderRightWidth: 0,
      overflow: "hidden",
      margin: "auto"
    }
  })
);

interface GridProps {
  board: BoardInterface;
  player: Player;
}

export default function Grid({ board, player }: GridProps) {
  const classes = useStyles();
  const gridSize = board.rows.length;

  return (
    <Box
      className={classes.root}
      gridTemplateColumns={`repeat(${gridSize}, ${tileSize}px)`}
      gridTemplateRows={`repeat(${gridSize}, ${tileSize}px)`}
    >
      {board.rows.map((row, i) => {
        return row.cells.map((tileConfig, j) => {
          return (
            <Tile key={`${i},${j}`} tileConfig={tileConfig} player={player} />
          );
        });
      })}
    </Box>
  );
}
