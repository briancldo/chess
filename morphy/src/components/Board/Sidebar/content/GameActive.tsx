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
  const { capturedPieces, turn } = board.state;
  const topColor = direction === 1 ? 'black' : 'white';
  const bottomColor = direction === 1 ? 'white' : 'black';
  const topName = gameDetails?.sides?.[topColor];
  const bottomName = gameDetails?.sides?.[bottomColor];
  const isBottomTurn = turn === getShorthandColor(bottomColor);
  const isTopTurn = !isBottomTurn;

  return (
    <div className='board-sidebar-game-active'>
      {topName && <SideName name={topName} isMyTurn={isTopTurn} />}
      <CapturedPiecesList {...{ capturedPieces, color: topColor }} />
      <div className='sidebar-game-active-body' />
      <CapturedPiecesList {...{ capturedPieces, color: bottomColor }} />
      {bottomName && <SideName name={bottomName} isMyTurn={isBottomTurn} />}
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
  isMyTurn: boolean;
}
const SideName: React.FC<SideNameProps> = (props) => {
  const { name, isMyTurn } = props;

  return (
    <div className='sidebar-game-active-username-row'>
      <span>
        <b
          data-testid={`match-username-${name}`}
          className={isMyTurn ? 'is-my-turn' : undefined}
        >
          {name}
          {isMyTurn ? ': your move!' : ''}
        </b>
      </span>
    </div>
  );
};
