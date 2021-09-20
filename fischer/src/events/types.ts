import { Server, Socket } from 'socket.io';

export type EventAdder = (io: Server, socket: Socket) => void;
