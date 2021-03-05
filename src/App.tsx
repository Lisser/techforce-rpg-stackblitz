import React, { useState } from "react";
import { Box, ThemeProvider } from "@material-ui/core";

import theme from "./common/theme";
import { initialBoard } from "./common/generalVariables";
import {
  BoardInterface,
  MoveDirection,
  PartialPlayer,
  Player
} from "./common/interfaces";

import Grid from "./board/Grid";
import AppBar from "./header/AppBar";
import Controls from "./board/Controls";
import { joinGame } from "./api/game";

export default function App() {
  const [player, setPlayer] = useState<Player>({
    id: "42",
    name: "super-bozz72",
    color: "#2196f3"
  });
  const [board, setBoard] = useState<BoardInterface>(initialBoard);

  console.log(joinGame);

  /*
  // This is some boilerplate code to help you connect to the server
  useEffect(() => {
    subscribeToBoard(board => {
      setBoard(board);
    });

    subscribeToPlayers(players => {
      setPlayerDataStore(players);
    });

    async function initialize() {
      const player = await register();
      console.log(player.id);
      setPlayerId(player.id);
    }

    initialize();

    return function () {
      shutdown();
    };
  }, []);

  useEffect(() => {
    function isPlayerOnBoard() {
      return board.rows.some(row => row.cells.some(cell => cell.userId === playerId));
    }

    if (playerId && !isPlayerOnBoard()) {
      joinGame(playerId);
    }
  }, [board, playerId]);
  */

  function movePlayer(direction: MoveDirection) {
    let position = { x: 0, y: 0 };
    board.rows.forEach((row, y) => {
      row.cells.forEach((cell, x) => {
        if (cell.userId === player.id) position = { x, y };
      });
    });

    switch (direction) {
      case MoveDirection.UP:
        position.y--;
        break;

      case MoveDirection.DOWN:
        position.y++;
        break;

      case MoveDirection.LEFT:
        position.x--;
        break;

      case MoveDirection.RIGHT:
        position.x++;
        break;
    }

    // TODO: Validate if the new spot is actually a valid location

    const newBoard = {
      rows: board.rows.map((row, i) => ({
        cells: row.cells.map((cell, j) => {
          if (cell.userId !== "" && cell.userId !== player.id) {
            return cell;
          }
          return {
            ...cell,
            userId: i === position.y && j === position.x ? player.id : ""
          };
        })
      }))
    };

    setBoard(newBoard);
  }

  function updatePlayer(partialPlayer: PartialPlayer) {
    setPlayer({
      ...player,
      ...partialPlayer
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="root">
        <Box className="top">
          <AppBar player={player} updatePlayer={updatePlayer} />
        </Box>
        <Box display="flex" className="center" m={1}>
          <Grid player={player} board={board} />
        </Box>
        <Box className="bottom">
          {player && <Controls player={player} move={movePlayer} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
