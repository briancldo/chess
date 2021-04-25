import React, { useEffect, useState } from 'react';

import Piece from './Piece';
import './MovablePiece.css';

export default function MovablePiece(props) {
  const { containingPiece } = props;
  const [dragging, setDragging] = useState(false);
  const [staticPieceVisible, setStaticPieceVisible] = useState(true);
  const [floatingPiecePosition, setFloatingPiecePosition] = useState({});
  const viewWidth = window.innerWidth;

  function mouseDownHandler(event) {
    setDragging(true);
    mouseMoveHandler(event);
  }

  function mouseUpHandler() {
    setDragging(false);
  }

  function mouseMoveHandler(event) {
    const { clientX, clientY } = event;
    setFloatingPiecePosition({
      x: clientX - 0.5 * 0.04 * viewWidth,
      y: clientY - 0.5 * 0.04 * viewWidth,
    });
  }

  useEffect(() => {
    if (dragging) {
      setStaticPieceVisible(false);
      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', mouseUpHandler);
    } else {
      setStaticPieceVisible(true);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    }

    return () => {
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  if (!containingPiece) return null;
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className='movable-piece-static'
        onMouseDown={mouseDownHandler}
        draggable={true}
        style={{ display: staticPieceVisible ? null : 'none' }}
      >
        <Piece {...{ containingPiece }} />
      </div>
      <div
        className='movable-piece-floating'
        style={{
          display: staticPieceVisible ? 'none' : null,
          top: floatingPiecePosition.y,
          left: floatingPiecePosition.x,
        }}
      >
        <Piece {...{ containingPiece }} />
      </div>
    </>
  );
}
