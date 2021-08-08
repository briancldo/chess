import { Socket } from 'socket.io';

interface SocketAugmentedFields {
  username: string;
}

export type PreAugmentedSocket = Socket & Partial<SocketAugmentedFields>;
export type AugmentedSocket = Socket & SocketAugmentedFields;
