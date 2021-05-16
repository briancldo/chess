import React, { useMemo } from 'react';

import { Piece } from '../../utils/pieces.types';
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

const PieceUI: React.FC<Piece> = (props) => {
  const { color, type } = props;

  const pieceImagePath = useMemo(
    () =>
      `${piecesDirectoryPathRelativePublic}/${colorMapping[color]}-${typeMapping[type]}.${pieceFileType}`,
    [color, type]
  );
  const style = { backgroundImage: `url(${pieceImagePath})` };
  return <div className='piece-container' style={style}></div>;
};

export interface PieceWrapperProps {
  containingPiece?: Piece;
}

const PieceWrapper: React.FC<PieceWrapperProps> = (props) => {
  const { containingPiece } = props;
  if (!containingPiece) return null;
  const { color, type } = containingPiece;

  return (
    <div className='piece-wrapper-outer'>
      <div className='piece-wrapper-inner'>
        <PieceUI {...{ type, color }} />
      </div>
    </div>
  );
};

export default PieceWrapper;
