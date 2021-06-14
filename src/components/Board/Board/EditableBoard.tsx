import React, { useState } from 'react';
import { produce } from 'immer';

import { Board, BoardSquare } from '../../../utils/board/board.types';
import { BoardUI } from './Board';
import { BoardData, BoardHandlers } from './Board.types';
import { Piece } from '../../../utils/pieces.types';
import PiecePalette, { PiecePaletteHandlers } from '../../Pieces/PiecePalette';
import { allSquares } from '../../../utils/board/square/square.constants';

interface EditableBoardProps {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

const dummyHandler = () => undefined;
const EditableBoard: React.FC<EditableBoardProps> = (props) => {
  const { board, setBoard } = props;
  const [candidateSquares, setCandidateSquares] = useState<BoardSquare[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const boardHandlers: BoardHandlers = {
    setPieceFocus: dummyHandler,
    removePieceFocus: dummyHandler,
    movePiece: (square) => {
      setBoard((board) =>
        produce(board, (draft) => {
          const { rank, file } = square;
          draft.position[rank][file] = isDeleteMode ? undefined : selectedPiece;
        })
      );
    },
    selectPromotionPiece: dummyHandler,
  };
  const boardData: BoardData = {
    candidateSquares,
    focusedPiece: {},
    gameOver: false,
    turn: 'w',
    promotion: { active: false },
    hideHighlights: true,
  };

  const piecePaletteHandlers: PiecePaletteHandlers = {
    selectPiece: (piece) => {
      setSelectedPiece(piece);
      setCandidateSquares(allSquares);
      piecePaletteHandlers.deactivateDeleteMode();
    },
    activateDeleteMode: () => {
      setIsDeleteMode(true);
      setSelectedPiece(undefined);
    },
    deactivateDeleteMode: () => setIsDeleteMode(false),
  };

  return (
    <>
      <PiecePalette
        side='b'
        selectedPiece={selectedPiece}
        handlers={piecePaletteHandlers}
      />
      <BoardUI board={board} handlers={boardHandlers} data={boardData} />
      <PiecePalette
        side='w'
        selectedPiece={selectedPiece}
        handlers={piecePaletteHandlers}
      />
    </>
  );
};

export default EditableBoard;
