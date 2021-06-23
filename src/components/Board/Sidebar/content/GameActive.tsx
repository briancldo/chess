import React from 'react';

import { GameActiveSidebarProps } from '../Sidebar.types';
import Piece from '../../../Pieces/Piece';
import './GameActive.css';
import { PieceColor, PieceType } from '../../../../utils/pieces.types';
import { CapturedPieces } from '../../../../utils/board/board.types';

const GameActive: React.FC<GameActiveSidebarProps> = (props) => {
  const { board } = props;
  const { capturedPieces } = board.state;

  return (
    <div className='board-sidebar-game-active'>
      <CapturedPiecesList {...{ capturedPieces, color: 'b' }} />
      <div className='sidebar-game-active-body' />
      <CapturedPiecesList {...{ capturedPieces, color: 'w' }} />
    </div>
  );
};

export default GameActive;

interface CapturedPiecesProps {
  capturedPieces: CapturedPieces;
  color: PieceColor;
}

const CapturedPiecesList: React.FC<CapturedPiecesProps> = (props) => {
  const { capturedPieces, color } = props;

  return (
    <div className='sidebar-game-active-captured-piece-row'>
      {capturedPieces[color].map((pieceType) => (
        <div
          key={`captured-${color}-${pieceType}`}
          className='sidebar-game-active-captured-piece'
          data-testid={`captured-${color}-${pieceType}`}
        >
          <Piece containingPiece={{ color, type: pieceType }} />
        </div>
      ))}
    </div>
  );
};
