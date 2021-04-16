import React, { useMemo } from 'react';

import { DevError } from '../../utils/errors';

const pieces = new Set(['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']);
const colors = new Set(['black', 'white']);
const piecesDirectoryPathRelativePublic = './assets/pieces';
const pieceFileType = 'png';

export default function Piece(props) {
  const { color, type } = props;
  if (!pieces.has(type)) throw new DevError(`No such piece: ${type}`);
  if (!colors.has(color)) throw new DevError(`No such color: ${color}`);

  const pieceImagePath = useMemo(
    () =>
      `${piecesDirectoryPathRelativePublic}/${color}-${type}.${pieceFileType}`,
    [color, type]
  );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '4vw',
        width: '4vw',
        backgroundImage: `url(${pieceImagePath})`,
        backgroundSize: 'cover',
      }}
    ></div>
  );
}
