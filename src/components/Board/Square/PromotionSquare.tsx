import React from 'react';
import { BoardRank, BoardSquare } from '../../../utils/board/board.types';

import { LiteralSquare } from './SquareUI';
import PieceUI from '../../Pieces/Piece';
import './PromotionSquare.css';
import { Piece, PieceColor, PieceType } from '../../../utils/pieces.types';
import config from '../../../config/config';
import { SelectPromotionPiece } from '../Board/Board.types';

const colorScheme = config.get('square.colors.default');
const promotionSquareColor = colorScheme.lightComplement;

interface PromotionSquareProps {
  square: BoardSquare;
  selectPromotionPiece: SelectPromotionPiece;
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

  function selectPromotionPiece(piece: Piece) {
    props.selectPromotionPiece(piece, square);
  }

  return (
    <>
      <div className={`promotion-squares-wrapper-${topOrBottom}`}>
        {promotionSquares.map(({ square, piece }) => {
          const selectPiece = () => selectPromotionPiece(piece);
          return (
            <React.Fragment
              key={`promotionSquareAt${square.file}${square.rank}`}
            >
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div className='promotion-square-wrapper' onMouseUp={selectPiece}>
                <LiteralSquare color={promotionSquareColor} square={square} />
                <PieceUI containingPiece={piece} />
              </div>
            </React.Fragment>
          );
        })}
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
