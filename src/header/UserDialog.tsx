import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Face from '@material-ui/icons/Face';

import { Player } from '../common/interfaces';
import { resetBoard, updatePlayer } from '../api/game';

import ColorPicker from '../common/ColorPicker';

interface UserDialogProps {
  player: Player;
}

export default function UserDialog({ player }: UserDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('#2196f3');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function changeUserName(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    updatePlayer({ name: event.target.value });
  }

  function changeGridSize(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    resetBoard(Number(event.target.value));
  }

  return (
    <div>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClickOpen}>
        <Face />
      </IconButton>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'User settings'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Here you can change some user settings</DialogContentText>
          <Box mb={2}>
            <TextField defaultValue={player.name} label="Name" onBlur={changeUserName} />
          </Box>
          <ColorPicker
            color={color}
            onChange={value => {
              setColor(value);
              updatePlayer({ ...player, color: value });
            }}
          />
          <DialogContentText>Your color: {color}</DialogContentText>
          {player.isAdmin ? (
            <Box mt={2}>
              <TextField label="Grid size" type="number" onBlur={changeGridSize} />
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
