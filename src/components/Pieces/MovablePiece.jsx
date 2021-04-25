import React from 'react';

import Piece from './Piece';
import './MovablePiece.css';

export default function MovablePiece(props) {
  const { containingPiece } = props;

  return (
    <div className='movable-piece'>
      <Piece {...{ containingPiece }} />
    </div>
  );
}
