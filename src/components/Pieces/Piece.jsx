import React, { useMemo } from 'react';

import { DevError } from '../../utils/errors';

import { ReactComponent as BlackKing } from './svg/black-king.svg';
import { ReactComponent as BlackQueen } from './svg/black-queen.svg';
import { ReactComponent as BlackRook } from './svg/black-rook.svg';
import { ReactComponent as BlackBishop } from './svg/black-bishop.svg';
import { ReactComponent as BlackKnight } from './svg/black-knight.svg';
import { ReactComponent as BlackPawn } from './svg/black-pawn.svg';

import { ReactComponent as WhiteKing } from './svg/white-king.svg';
import { ReactComponent as WhiteQueen } from './svg/white-queen.svg';
import { ReactComponent as WhiteRook } from './svg/white-rook.svg';
import { ReactComponent as WhiteBishop } from './svg/white-bishop.svg';
import { ReactComponent as WhiteKnight } from './svg/white-knight.svg';
import { ReactComponent as WhitePawn } from './svg/white-pawn.svg';

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

  const PieceSvg = useMemo(() => pieceSvgMapping[`${color}-${type}`], [
    color,
    type,
  ]);
  return <PieceSvg />;
}
