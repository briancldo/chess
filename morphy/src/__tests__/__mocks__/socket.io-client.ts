export const socketInstance = {
  connect: jest.fn(() => {
    socketInstance.connected = true;
  }),
  disconnect: jest.fn(() => {
    socketInstance.connected = false;
  }),
  connected: false,
};

export const io = jest.fn(() => {
  return socketInstance;
});
