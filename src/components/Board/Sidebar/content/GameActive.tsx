import React from 'react';

import { GameActiveSidebarProps } from '../Sidebar.types';
import Piece from '../../../Pieces/Piece';
import './GameActive.css';

const GameActive: React.FC<GameActiveSidebarProps> = (props) => {
  const { board } = props;
  const { capturedPieces } = board.state;

  return (
    <div className='board-sidebar-game-active'>
      <div className='sidebar-game-active-captured-piece-row'>
        {capturedPieces.b.map((pieceType) => (
          <div
            key={`captured-b-${pieceType}`}
            className='sidebar-game-active-captured-piece'
          >
            <Piece containingPiece={{ color: 'b', type: pieceType }} />
          </div>
        ))}
      </div>
      <div className='sidebar-game-active-body' />
      <div className='sidebar-game-active-captured-piece-row'>
        {capturedPieces.w.map((pieceType) => (
          <div
            key={`captured-w-${pieceType}`}
            className='sidebar-game-active-captured-piece'
          >
            <Piece containingPiece={{ color: 'w', type: pieceType }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameActive;
