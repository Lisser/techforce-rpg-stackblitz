import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { PlayerDataStore } from '../common/interfaces';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

interface PlayerInfoProps {
  playerStore: PlayerDataStore;
}

export default function PlayerInfo({ playerStore }: PlayerInfoProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {Object.values(playerStore).map(player => {
        return (
          <div key={player.id}>
            {player.name || player.id}: {player.health}
          </div>
        );
      })}
    </Box>
  );
}
