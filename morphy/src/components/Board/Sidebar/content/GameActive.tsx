import React from 'react';

import { GameActiveSidebarProps } from '../Sidebar.types';
import Piece from '../../../Pieces/Piece';
import './GameActive.css';
import { PieceColor, PieceColorFull } from '../../../../utils/pieces.types';
import { CapturedPieces } from '../../../../utils/board/board.types';
import { getShorthandColor } from '../../../../utils/pieces';
import { Username } from '../../../../store/user';

const GameActive: React.FC<GameActiveSidebarProps> = (props) => {
  const { board, direction, gameDetails } = props;
  const { capturedPieces } = board.state;
  const topColor = direction === 1 ? 'black' : 'white';
  const bottomColor = direction === 1 ? 'white' : 'black';
  const topName = gameDetails?.sides?.[topColor];
  const bottomName = gameDetails?.sides?.[bottomColor];

  return (
    <div className='board-sidebar-game-active'>
      {topName && <SideName name={topName} />}
      <CapturedPiecesList {...{ capturedPieces, color: topColor }} />
      <div className='sidebar-game-active-body' />
      <CapturedPiecesList {...{ capturedPieces, color: bottomColor }} />
      {bottomName && <SideName name={bottomName} />}
    </div>
  );
};

export default GameActive;

interface CapturedPiecesProps {
  capturedPieces: CapturedPieces;
  color: PieceColor | PieceColorFull;
}

const CapturedPiecesList: React.FC<CapturedPiecesProps> = (props) => {
  const { capturedPieces, color: _color } = props;
  const color = getShorthandColor(_color);

  return (
    <div className='sidebar-game-active-captured-piece-row'>
      {capturedPieces[color].map((pieceType, index) => (
        <div
          key={`captured-${color}-${pieceType}-${index}`}
          className='sidebar-game-active-captured-piece'
          data-testid={`captured-${color}-${pieceType}`}
        >
          <Piece containingPiece={{ color, type: pieceType }} />
        </div>
      ))}
    </div>
  );
};

interface SideNameProps {
  name: Username;
}
const SideName: React.FC<SideNameProps> = (props) => {
  const { name } = props;

  return (
    <div className='sidebar-game-active-username-row'>
      <p>
        <b>{name}</b>
      </p>
    </div>
  );
};
