import React from 'react';

import { SquareUI } from '../Board/Square/Square';
import { Piece, PieceColor } from '../../utils/pieces.types';
import { matchingPieces, PIECES } from '../../utils/pieces';
import config from '../../config/config';
import './PiecePalette.css';

const lightSquareColor = config.get('square.colors.default').light;
const darkSquareColor = config.get('square.colors.default').dark;

export interface PiecePaletteHandlers {
  selectPiece: (piece: Piece) => void;
}

interface PiecePaletteProps {
  side: PieceColor;
  selectedPiece?: Piece;
  handlers: PiecePaletteHandlers;
}

const PiecePalette: React.FC<PiecePaletteProps> = (props) => {
  const { side, selectedPiece, handlers } = props;
  const pieces = PIECES[side];

  return (
    <div className='piece-palette'>
      <SquareUI
        color={lightSquareColor}
        isCurrentlyFocusedPiece={matchingPieces(pieces.p, selectedPiece)}
        containingPiece={pieces.p}
        className='square-wrapper'
      />
      <SquareUI
        color={darkSquareColor}
        isCurrentlyFocusedPiece={matchingPieces(pieces.n, selectedPiece)}
        containingPiece={pieces.n}
        className='square-wrapper'
      />
      <SquareUI
        color={lightSquareColor}
        isCurrentlyFocusedPiece={matchingPieces(pieces.b, selectedPiece)}
        containingPiece={pieces.b}
        className='square-wrapper'
      />
      <SquareUI
        color={darkSquareColor}
        isCurrentlyFocusedPiece={matchingPieces(pieces.r, selectedPiece)}
        containingPiece={pieces.r}
        className='square-wrapper'
      />
      <SquareUI
        color={lightSquareColor}
        isCurrentlyFocusedPiece={matchingPieces(pieces.q, selectedPiece)}
        containingPiece={pieces.q}
        className='square-wrapper'
      />
      <SquareUI
        color={darkSquareColor}
        isCurrentlyFocusedPiece={matchingPieces(pieces.k, selectedPiece)}
        containingPiece={pieces.k}
        className='square-wrapper'
      />
    </div>
  );
};

export default PiecePalette;
