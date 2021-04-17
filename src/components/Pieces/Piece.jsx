import React, { useMemo } from 'react';

import './Piece.css';

const colorMapping = { b: 'black', w: 'white' };
const typeMapping = {
  k: 'king',
  q: 'queen',
  r: 'rook',
  b: 'bishop',
  n: 'knight',
  p: 'pawn',
};

const piecesDirectoryPathRelativePublic = './assets/pieces';
const pieceFileType = 'png';

export default function Piece(props) {
  const { color, type } = props;

  const pieceImagePath = useMemo(
    () =>
      `${piecesDirectoryPathRelativePublic}/${colorMapping[color]}-${typeMapping[type]}.${pieceFileType}`,
    [color, type]
  );
  const style = { backgroundImage: `url(${pieceImagePath})` };
  return <div className='piece-container' style={style}></div>;
}
