import React from 'react';
import { BoardRank, BoardSquare } from '../../../utils/board/board.types';

import { LiteralSquare } from './SquareUI';
import PieceUI from '../../Pieces/Piece';
import './PromotionSquare.css';
import { Piece, PieceColor, PieceType } from '../../../utils/pieces.types';

interface PromotionSquareProps {
  square: BoardSquare;
}

const PromotionSquare: React.FC<PromotionSquareProps> = (props) => {
  const { square } = props;
  if (square.rank !== 8 && square.rank !== 1) return null;

  const topOrBottom = square.rank === 8 ? 'top' : 'bottom';
  const threeBelowSquares = getNBelowSquares(square, 3);
  const promotionSquares = producePromotionSquares(
    [square, ...threeBelowSquares],
    topOrBottom
  );

  return (
    <>
      <div className='square-wrapper' /> {/* for spacing */}
      <div className='promotion-squares-wrapper'>
        <div className={`promotion-squares-wrapper-${topOrBottom}`}>
          {promotionSquares.map(({ square, piece }) => (
            <React.Fragment
              key={`promotionSquareAt${square.file}${square.rank}`}
            >
              <div className='promotion-square-wrapper'>
                <LiteralSquare color='white' square={square} />
                <PieceUI containingPiece={piece} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default PromotionSquare;

function getNBelowSquares(square: BoardSquare, n: number): BoardSquare[] {
  const offset = square.rank === 8 ? -1 : 1;
  const squares: BoardSquare[] = [];

  let startingRank = square.rank;
  for (let i = 0; i < n; i++) {
    startingRank += offset;
    squares.push({ rank: startingRank as BoardRank, file: square.file });
  }
  return squares;
}

const promotionPieceTypes = {
  top: ['q', 'r', 'b', 'n'] as PieceColor[],
  bottom: ['n', 'b', 'r', 'q'] as PieceColor[],
};
function producePromotionSquares(
  promoSquares: BoardSquare[],
  topOrBottom: 'top' | 'bottom'
): { square: BoardSquare; piece: Piece }[] {
  const squares = sortPromoSquares(promoSquares);
  const piecesTypes = promotionPieceTypes[topOrBottom];
  const pieceColor: PieceColor = topOrBottom === 'top' ? 'w' : 'b';
  return squares.map((square, index) => ({
    square,
    piece: { type: piecesTypes[index] as PieceType, color: pieceColor },
  }));
}

function sortPromoSquares(squares: BoardSquare[]) {
  return squares.sort((square1, square2) =>
    square1.rank < square2.rank ? 1 : -1
  );
}
