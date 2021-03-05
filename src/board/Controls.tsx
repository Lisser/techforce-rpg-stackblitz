import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { MoveDirection, Player } from '../common/interfaces';
import { attack, move, resetBoard } from '../api/game';

const useStyles = makeStyles(theme => ({
  controls: {
    display: 'flex',
    justifyContent: 'center'
  },
  outer_col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  middle_col: {
    display: 'flex',
    flexDirection: 'column'
  },
  left_row: {
    display: 'flex'
  },
  right_row: {
    display: 'flex'
  }
}));

interface ControlsProps {
  player?: Player;
}

export default function Controls({ player }: ControlsProps) {
  const classes = useStyles();

  function onClickResetBoard() {
    resetBoard();
  }

  function onClickMove(direction: MoveDirection) {
    move(direction);
  }

  async function dealDamage() {
    attack();
  }

  return (
    <Box className={classes.controls}>
      <Box className={classes.outer_col}>
        <Box className={classes.left_row}>
          <IconButton edge="start" color="primary" aria-label="menu" onClick={() => onClickMove(MoveDirection.LEFT)}>
            <KeyboardArrowLeft />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.middle_col}>
        <IconButton edge="start" color="primary" aria-label="menu" onClick={() => onClickMove(MoveDirection.UP)}>
          <KeyboardArrowUp />
        </IconButton>
        <IconButton edge="start" color="primary" aria-label="menu" onClick={() => onClickMove(MoveDirection.DOWN)}>
          <KeyboardArrowDown />
        </IconButton>
      </Box>
      <Box className={classes.outer_col}>
        <Box className={classes.right_row}>
          <IconButton edge="start" color="primary" aria-label="menu" onClick={() => onClickMove(MoveDirection.RIGHT)}>
            <KeyboardArrowRight />
          </IconButton>
          {player?.isAdmin ? <Button onClick={onClickResetBoard}>Reset board</Button> : null}
          <Button onClick={dealDamage}>Attack!</Button>
        </Box>
      </Box>
    </Box>
  );
}
