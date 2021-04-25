import React, { useEffect, useState } from 'react';

import Piece from './Piece';
import './MovablePiece.css';

export default function MovablePiece(props) {
  const { containingPiece } = props;
  const [dragging, setDragging] = useState(false);
  const [staticPieceVisible, setStaticPieceVisible] = useState(true);

  function mouseUpHandler() {
    setDragging(false);
  }

  useEffect(() => {
    if (dragging) {
      console.log('dragging');
      setStaticPieceVisible(false);
      // window.addEventListener('mousemove' /* update floatingPiecePosition */);
      window.addEventListener('mouseup', mouseUpHandler);
    } else {
      console.log('no dragging');
      setStaticPieceVisible(true);
      // window.removeEventListener(
      //   'mousemove' /* update floatingPiecePosition */
      // );
      window.removeEventListener('mouseup', mouseUpHandler);
    }

    return () => {
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [dragging]);

  if (!containingPiece) return null;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className='movable-piece'
      onMouseDown={() => setDragging(true)}
      draggable={true}
      hidden={!staticPieceVisible}
    >
      <Piece {...{ containingPiece }} />
    </div>
  );
}
