import React from 'react';

import { DevError } from '../../utils/errors';

import BlackKing from './svg/black-king.svg';
import BlackQueen from './svg/black-queen.svg';
import BlackRook from './svg/black-rook.svg';
import BlackBishop from './svg/black-bishop.svg';
import BlackKnight from './svg/black-knight.svg';
import BlackPawn from './svg/black-pawn.svg';

import WhiteKing from './svg/white-king.svg';
import WhiteQueen from './svg/white-queen.svg';
import WhiteRook from './svg/white-rook.svg';
import WhiteBishop from './svg/white-bishop.svg';
import WhiteKnight from './svg/white-knight.svg';
import WhitePawn from './svg/white-pawn.svg';

const pieces = new Set(['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']);
const colors = new Set(['black', 'white']);
const pieceSvgMapping = {
  'black-king': BlackKing,
  'black-queen': BlackQueen,
  'black-rook': BlackRook,
  'black-bishop': BlackBishop,
  'black-knight': BlackKnight,
  'black-pawn': BlackPawn,
  'white-king': WhiteKing,
  'white-queen': WhiteQueen,
  'white-rook': WhiteRook,
  'white-bishop': WhiteBishop,
  'white-knight': WhiteKnight,
  'white-pawn': WhitePawn,
};

export default function Piece(props) {
  const { color, type } = props;
  if (!pieces.has(type)) throw new DevError(`No such piece: ${type}`);
  if (!colors.has(color)) throw new DevError(`No such color: ${color}`);

  const pieceName = `${color}-${type}`;
  const pieceSvg = pieceSvgMapping[pieceName];
  return <img src={pieceSvg} alt={pieceName} />;
}
