import React from 'react';

import { SquareUI } from '../Board/Square/SquareUI';
import { Piece, PieceColor } from '../../utils/pieces.types';
import { matchingPieces, PIECES } from '../../utils/pieces';
import config from '../../config/config';
import './PiecePalette.css';
import { SquareUIProps } from '../Board/Square/Square.types';

const lightSquareColor = config.get('square.colors.default').light;
const darkSquareColor = config.get('square.colors.default').dark;

export interface PiecePaletteHandlers {
  selectPiece: (piece: Piece) => void;
  activateDeleteMode: () => void;
  deactivateDeleteMode: () => void;
}

interface PiecePaletteProps {
  side: PieceColor;
  selectedPiece?: Piece;
  handlers: PiecePaletteHandlers;
}

const PiecePalette: React.FC<PiecePaletteProps> = (props) => {
  const { side, selectedPiece, handlers } = props;
  const p = PIECES[side];
  const pieces = [p.p, p.n, p.b, p.r, p.q, p.k];

  return (
    <div className='piece-palette'>
      <button
        className='square-wrapper'
        style={{
          backgroundColor: darkSquareColor,
          borderColor: selectedPiece ? '' : 'red',
        }}
        onClick={handlers.activateDeleteMode}
      >
        Delete
      </button>
      {pieces.map((piece, index) => {
        const color = index % 2 === 0 ? lightSquareColor : darkSquareColor;

        return (
          <PaletteSquare
            key={`piece-palette-${piece.color}-${piece.type}`}
            color={color}
            isCurrentlyFocusedPiece={matchingPieces(piece, selectedPiece)}
            containingPiece={piece}
            className='square-wrapper'
            handlers={handlers}
          />
        );
      })}
    </div>
  );
};

export default PiecePalette;

interface PaletteSquareProps extends SquareUIProps {
  containingPiece: Piece;
  handlers: PiecePaletteHandlers;
}

const PaletteSquare: React.FC<PaletteSquareProps> = (props) => {
  const { containingPiece, handlers } = props;

  function handleMouseDown() {
    handlers.selectPiece(containingPiece);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onMouseDown={handleMouseDown}>
      <SquareUI {...props} />
    </div>
  );
};
