export const socketInstance = {
  connect: jest.fn(() => undefined),
  disconnect: jest.fn(() => undefined),
};

export const io = jest.fn(() => {
  return socketInstance;
});
