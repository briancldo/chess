import React, { useState } from 'react';
import { produce } from 'immer';

import { BoardSquare } from '../../../utils/board/board.types';
import {
  createBoard,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';

import { BoardUI } from './Board';
import { BoardData, BoardHandlers } from './Board.types';
import { Piece } from '../../../utils/pieces.types';
import PiecePalette, { PiecePaletteHandlers } from '../../Pieces/PiecePalette';

interface EditableBoardProps {
  any?: never;
}

const emptyBoard = createBoard({ position: createFromConcisePosition({}) });
const dummyHandler = () => undefined;
const EditableBoard: React.FC<EditableBoardProps> = () => {
  const [board, setBoard] = useState(emptyBoard);
  const [candidateSquares, setCandidateSquares] = useState<BoardSquare[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>();

  const boardHandlers: BoardHandlers = {
    setPieceFocus: dummyHandler,
    removePieceFocus: dummyHandler,
    movePiece: (square) => {
      setBoard((board) =>
        produce(board, (draft) => {
          const { rank, file } = square;
          draft.position[rank][file] = selectedPiece;
        })
      );
      setCandidateSquares([]);
    },
  };
  const boardData: BoardData = {
    candidateSquares,
    focusedPiece: {},
    gameOver: false,
    turn: 'w',
  };

  const piecePaletteHandlers: PiecePaletteHandlers = {
    selectPiece: (piece) => {
      setSelectedPiece(piece);
    },
  };

  return (
    <>
      <PiecePalette
        side='b'
        selectedPiece={selectedPiece}
        handlers={piecePaletteHandlers}
      />
      <BoardUI board={board} handlers={boardHandlers} data={boardData} />;
      <PiecePalette
        side='w'
        selectedPiece={selectedPiece}
        handlers={piecePaletteHandlers}
      />
    </>
  );
};

export default EditableBoard;
