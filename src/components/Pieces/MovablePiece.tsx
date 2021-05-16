import React, { useEffect, useState, CSSProperties } from 'react';

import PieceUI from './Piece';
import './MovablePiece.css';
import { Piece } from '../../utils/pieces.types';

interface MovablePieceProps {
  containingPiece?: Piece;
}

const MovablePiece: React.FC<MovablePieceProps> = (props) => {
  const { containingPiece } = props;
  const [dragging, setDragging] = useState(false);
  const [staticPieceVisible, setStaticPieceVisible] = useState(true);
  const [floatingPiecePosition, setFloatingPiecePosition] = useState<{ x?: number, y?: number}>({});
  const viewWidth = window.innerWidth;

  function mouseDownHandler(event: React.MouseEvent) {
    setDragging(true);
    document.body.style.cursor = 'grabbing';
    mouseMoveHandler(event as unknown as Event);
  }

  function mouseUpHandler() {
    document.body.style.cursor = '';
    setDragging(false);
  }

  function mouseMoveHandler(event: Event) {
    const { clientX, clientY } = event as unknown as React.MouseEvent;
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
  const piece = <PieceUI {...{ containingPiece }} />;
  const staticPieceStyle: CSSProperties = { display: staticPieceVisible ? 'inline' : 'none' };
  const floatingPieceStyle: CSSProperties = {
    display: staticPieceVisible ? 'none' : 'inline',
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

export default MovablePiece;
