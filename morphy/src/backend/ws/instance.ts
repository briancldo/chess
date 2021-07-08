import { io } from 'socket.io-client';

let isSocketInitialized = false;
let socket = io();

export function initializeSocket(initSocket: typeof socket) {
  if (isSocketInitialized) return;
  socket = initSocket;
  isSocketInitialized = true;
}
