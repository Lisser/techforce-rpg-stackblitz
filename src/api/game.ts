import { Directions } from '@material-ui/icons';
import { connect } from 'socket.io-client';

import { BoardInterface, MoveDirection, PartialPlayer, Player, PlayerDataStore } from '../common/interfaces';

const SERVER_URL = 'http://34.91.182.222:8080';

let socket = connect(SERVER_URL);
socket.on('connect', () => {
  console.log('joining game');
});

const moves = [
  () => move(MoveDirection.RIGHT),
  () => move(MoveDirection.DOWN),
  () => move(MoveDirection.LEFT),
  () => move(MoveDirection.UP),
  () => attack(),
]

let i = 0;
setInterval(() => {
  moves[i]();
  i = (i + 1) % 5;
}, 1000);

export function register() {
  return new Promise<Player>((resolve, reject) => {
    try {
      socket.emit('register', (player: Player) => {
        resolve(player);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function joinGame(id: string) {
  socket.emit('join game', id);
}

export function move(direction: MoveDirection) {
  socket.emit('move', direction);
}

export function attack() {
  socket.emit('attack');
}

export function updatePlayer(player: PartialPlayer) {
  socket.emit('update player', player);
}

export function subscribeToBoard(callback: (board: BoardInterface) => void) {
  socket.on('board', callback);
}

export function subscribeToPlayers(callback: (players: PlayerDataStore) => void) {
  socket.on('players', callback);
}

export function shutdown() {
  socket.close();
  socket = connect(SERVER_URL);
}

export function resetBoard(size?: number) {
  socket.emit('reset board', size);
}
