import React, { useEffect, useState } from 'react';
import { Box, ThemeProvider } from '@material-ui/core';

import theme from './common/theme';
import { BoardInterface, Player, PlayerDataStore } from './common/interfaces';

import Grid from './board/Grid';
import AppBar from './header/AppBar';
import Controls from './board/Controls';
import { register, joinGame, subscribeToBoard, subscribeToPlayers, shutdown } from './api/game';
import PlayerInfo from './board/PlayerInfo';

const initialState: BoardInterface = { rows: [{ cells: [] }] };

export default function App() {
  const [playerId, setPlayerId] = useState<string>('');
  const [playerDataStore, setPlayerDataStore] = useState<PlayerDataStore>({});
  const [board, setBoard] = useState<BoardInterface>(initialState);

  const player: Player | undefined = playerDataStore && playerDataStore[playerId];

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

  return (
    <ThemeProvider theme={theme}>
      <Box className="root">
        <Box className="top">
          <AppBar player={player} />
        </Box>
        <Box display="flex" className="center" m={1}>
          <Grid playerData={playerDataStore} board={board} />
        </Box>
        <Box className="bottom">
          {player && <Controls player={player} />}
          <PlayerInfo playerStore={playerDataStore} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
