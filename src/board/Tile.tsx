import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import { tileSize } from '../common/generalVariables';
import { PlayerDataStore, TileConfig } from '../common/interfaces';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      border: 'solid 1px black',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      width: tileSize,
      height: tileSize,
      overflow: 'hidden',
      boxSizing: 'border-box'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }
  })
);

interface TileProps {
  tileConfig: TileConfig;
  playerData: PlayerDataStore;
}

export default function Tile({ tileConfig, playerData }: TileProps) {
  const classes = useStyles();

  let backgroundColor: string = grey[50];
  if (tileConfig.userId) backgroundColor = playerData[tileConfig.userId]?.color;
  if (tileConfig.obstacle) backgroundColor = grey[700];

  let content = '';
  if (tileConfig.userId) content = '🧙';

  return (
    <Box className={classes.root}>
      <Box className={classes.content} bgcolor={backgroundColor}>
        {content}
      </Box>
    </Box>
  );
}
