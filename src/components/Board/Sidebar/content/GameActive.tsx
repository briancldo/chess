import React from 'react';

import { GameActiveSidebarProps } from '../Sidebar.types';
import Piece from '../../../Pieces/Piece';
import './GameActive.css';
import { PieceColor, PieceType } from '../../../../utils/pieces.types';

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
  capturedPieces: {
    w: PieceType[];
    b: PieceType[];
  };
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
        >
          <Piece containingPiece={{ color, type: pieceType }} />
        </div>
      ))}
    </div>
  );
};
