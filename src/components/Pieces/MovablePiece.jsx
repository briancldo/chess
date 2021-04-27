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
    document.body.style.cursor = 'grabbing';
    mouseMoveHandler(event);
  }

  function mouseUpHandler() {
    document.body.style.cursor = '';
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
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  if (!containingPiece) return null;
  const piece = <Piece {...{ containingPiece }} />;
  const staticPieceStyle = { display: staticPieceVisible ? null : 'none' };
  const floatingPieceStyle = {
    display: staticPieceVisible ? 'none' : null,
    top: floatingPiecePosition.y,
    left: floatingPiecePosition.x,
  };
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className='movable-piece-static'
        onMouseDown={mouseDownHandler}
        draggable={true}
        style={staticPieceStyle}
      >
        {piece}
      </div>
      <div className='movable-piece-floating' style={floatingPieceStyle}>
        {piece}
      </div>
    </>
  );
}
