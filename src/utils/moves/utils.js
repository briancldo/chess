import {
  getSquareAtOffset,
  getPieceAtSquare,
  ranks,
  orderedRanks,
  files,
} from '../board';
import rookMove from './rook';
import bishopMove from './bishop';
import knightMove from './knight';

export function getLegalSquaresInDirection(
  square,
  board,
  color,
  offsetDirection
) {
  const squares = [];
  let currentSquare = square;
  const [offsetX, offsetY] = offsetDirection;
  let done = false;

  while (!done) {
    try {
      currentSquare = getSquareAtOffset(currentSquare, offsetX, offsetY);
      const currentSquarePiece = getPieceAtSquare(board, currentSquare);

      if (!currentSquarePiece) {
        squares.push(currentSquare);
        continue;
      }

      if (currentSquarePiece.color !== color) squares.push(currentSquare);
      done = true;
    } catch {
      done = true;
    }
  }

  return squares;
}

export function excludeOccupiedSquares(squares, board, color, options = {}) {
  return squares.filter((square) => {
    const piece = getPieceAtSquare(board, square);

    if (!piece) return true;
    if (options.ignoreColor) return false;
    if (piece.color !== color) return true;

    return false;
  });
}

export const castlingPathSquares = {
  w: {
    q: [
      { rank: ranks.first, file: 'b' },
      { rank: ranks.first, file: 'c' },
      { rank: ranks.first, file: 'd' },
    ],
    k: [
      { rank: ranks.first, file: 'f' },
      { rank: ranks.first, file: 'g' },
    ],
  },
  b: {
    q: [
      { rank: ranks.last, file: 'b' },
      { rank: ranks.last, file: 'c' },
      { rank: ranks.last, file: 'd' },
    ],
    k: [
      { rank: ranks.last, file: 'f' },
      { rank: ranks.last, file: 'g' },
    ],
  },
};

export function getDirection(color) {
  return color === 'w' ? 1 : -1;
}

export function isSquareAttacked(square, board, color) {
  for (const pieceType of ['r', 'b', 'n', 'p']) {
    const attacked = isSquareAttackedByPiece(pieceType, square, board, color);
    if (attacked) return true;
  }

  return false;
}

const attackingPiecesData = {
  r: { getMoves: rookMove, pieces: ['r', 'q'] },
  b: { getMoves: bishopMove, pieces: ['b', 'q'] },
  n: { getMoves: knightMove, pieces: ['n'] },
  p: {
    getMoves: (square, board, color) => {
      const direction = getDirection(color);
      const pawnMoves = [];
      try {
        const leftDiagonal = getSquareAtOffset(square, -direction, direction);
        pawnMoves.push(leftDiagonal);
      } catch {
        0;
      }
      try {
        const rightDiagonal = getSquareAtOffset(square, direction, direction);
        pawnMoves.push(rightDiagonal);
      } catch {
        0;
      }
      return pawnMoves;
    },
    pieces: ['p'],
  },
};

function isSquareAttackedByPiece(pieceType, square, board, color) {
  const { getMoves, pieces } = attackingPiecesData[pieceType];
  const moves = getMoves(square, board, color);
  const movePieces = moves.map((move) => getPieceAtSquare(board, move));
  for (const piece of movePieces) {
    if (!piece) continue;
    if (pieces.includes(piece.type) && piece.color !== color) return true;
  }
  return false;
}

export function setCheckDetails(board, draft, kingSquare, color) {
  const threatPieces = getThreatPieces(draft, kingSquare, color);
  const threatSquares = getThreatSquares(kingSquare, threatPieces);

  draft[0].king.checkDetails.threatPieces = threatPieces;
  draft[0].king.checkDetails.threatSquares = threatSquares;
}

function getThreatPieces(draft, square, color) {
  const threatPieces = [];
  for (const pieceType of ['r', 'b', 'n', 'p']) {
    const { getMoves, pieces } = attackingPiecesData[pieceType];
    const moves = getMoves(square, draft, color);
    const movePieces = moves.map((move) => getPieceAtSquare(draft, move));

    for (const [i, piece] of movePieces.entries()) {
      if (piece && pieces.includes(piece.type) && piece.color !== color) {
        threatPieces.push({ piece, square: moves[i] });
      }
    }
  }
  return threatPieces;
}

function getIntermediateRanks(rank1, rank2) {
  const rank1Index = ranks.indexOf(rank1);
  const rank2Index = ranks.indexOf(rank2);
  const [startRankIndex, endRankIndex] = [rank1Index, rank2Index].sort();
  return orderedRanks.slice(startRankIndex + 1, endRankIndex);
}

function getIntermediateFiles(file1, file2) {
  const file1Index = files.indexOf(file1);
  const file2Index = files.indexOf(file2);
  const [startFileIndex, endFileIndex] = [file1Index, file2Index].sort();
  return files.slice(startFileIndex + 1, endFileIndex);
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function getThreatSquares(attackedSquare, threatPieces) {
  const threatSquares = [];
  for (const threatPieceInfo of threatPieces) {
    const { piece: threatPiece, square: threatSquare } = threatPieceInfo;

    if (['n', 'p'].includes(threatPiece.type)) continue;

    let rookLike = false;
    let bishopLike = false;
    if (threatPiece.type === 'q') {
      if (
        threatSquare.rank === attackedSquare.rank ||
        threatSquare.file === attackedSquare.file
      ) {
        rookLike = true;
      } else {
        bishopLike = true;
      }
    }

    /*
      if rook or rook-like queen:
        if rank different:
          return [{ file: <same>, rank: <in between king & rook/queen> }, ...]
        if file different:
          return [{ file: <in between king & rook/queen>, rank: <same> }, ...]
    */
    if (threatPiece === 'r' || rookLike) {
      if (threatSquare.rank !== attackedSquare.rank)
        threatSquares.push(
          ...getIntermediateRanks(threatSquare.rank, attackedSquare.file).map(
            (rank) => ({
              file: threatSquare.file,
              rank,
            })
          )
        );
      threatSquares.push(
        ...getIntermediateFiles(threatSquare.file, attackedSquare.file).map(
          (file) => ({
            file,
            rank: threatSquare.rank,
          })
        )
      );
    }

    /*
      if bishop or bishop-like queen:
        return [{ file: <intermediate files>, rank: <intermediate ranks> }, ...]
    */
    if (threatPiece === 'b' || bishopLike) {
      const intermediateRanks = getIntermediateRanks(
        threatSquare.rank,
        attackedSquare.rank
      );
      const intermediateFiles = getIntermediateFiles(
        threatSquare.file,
        attackedSquare.file
      );
      // eslint-disable-next-line unicorn/no-for-loop
      for (let i = 0; i < intermediateRanks.length; i++) {
        const rank = intermediateRanks[i];
        const file = intermediateFiles[i];
        threatSquares.push({ rank, file });
      }
    }
  }
  return threatSquares;
}
