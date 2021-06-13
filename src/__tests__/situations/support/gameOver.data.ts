import { Board } from '../../../utils/board/board.types';
import { createBoard } from '../../../utils/board/editor/boardEditor';
import { MoveCoordinates } from '../../__utils__/squareInteraction';

interface GameOverSetup {
  initialBoard: Board;
  moves: MoveCoordinates[];
  resultText: string;
}

export const checkmate: GameOverSetup[] = [
  {
    initialBoard: createBoard({}),
    moves: [
      { origin: 'f2', destination: 'f3' },
      { origin: 'e7', destination: 'e6' },
      { origin: 'g2', destination: 'g4' },
      { origin: 'd8', destination: 'h4' },
    ],
    resultText: 'Black wins by checkmate.',
  },
  {
    initialBoard: createBoard({}),
    moves: [
      { origin: 'a2', destination: 'a3' },
      { origin: 'f7', destination: 'f6' },
      { origin: 'e2', destination: 'e3' },
      { origin: 'g7', destination: 'g5' },
      { origin: 'd1', destination: 'h5' },
    ],
    resultText: 'White wins by checkmate.',
  },
];

export const stalemate: GameOverSetup[] = [
  {
    initialBoard: createBoard({
      position: {
        wk: ['h1'],
        bq: ['e2'],
        wp: ['c5', 'h6'],
        bp: ['c6', 'h7'],
      },
      state: { turn: 'b' },
    }),
    moves: [{ origin: 'e2', destination: 'f2' }],
    resultText: 'Draw by stalemate.',
  },
];
