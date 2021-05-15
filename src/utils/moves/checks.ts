import { produce } from 'immer';
import {
  getPieceAtSquare,
  matchingSquares,
  orderedRanks,
  files,
} from '../board';
import { isSquareAttacked, attackingPiecesData } from './utils';

export function excludeNonCheckHandlingSquares(candidates, boardState, piece) {
  const { checkDetails } = boardState.king;
  const checkHandlingSquares = [];
  checkHandlingSquares.push(
    ...excludeNonBlockOrCaptureSquares(candidates, checkDetails, piece),
    ...excludeNonKingMoveSquares(candidates, checkDetails.threatSquares, piece)
  );
  return checkHandlingSquares;
}

function excludeNonBlockOrCaptureSquares(candidates, checkDetails, piece) {
  const { threatPieces, threatSquares } = checkDetails;
  if (piece.type === 'k') return [];
  if (threatPieces.length > 1) return [];

  const allBlockOrCaptureSquares = [threatPieces[0].square, ...threatSquares];
  return candidates.filter((candidate) =>
    allBlockOrCaptureSquares.some((blockOrCaptureSquare) =>
      matchingSquares(blockOrCaptureSquare, candidate)
    )
  );
}

function excludeNonKingMoveSquares(candidates, threatSquares, piece) {
  if (piece.type !== 'k') return [];

  return candidates.filter(
    (candidate) =>
      !threatSquares.some((threatSquare) =>
        matchingSquares(threatSquare, candidate)
      )
  );
}

// -------------------------------------------------------------------

export function excludeCheckingSquares(candidates, board, pieceColor) {
  const { state: boardState, position } = board;
  const kingSquare = boardState.king[pieceColor].square;
  const positionWithoutKing = produce(position, (draft) => {
    draft[kingSquare.rank][kingSquare.file] = undefined;
  });

  return candidates.filter(
    (candidate) => !isSquareAttacked(candidate, positionWithoutKing, pieceColor)
  );
}

// -------------------------------------------------------------------

export function setCheckDetails(draft, kingSquare, color) {
  const threatPieces = getThreatPieces(draft.position, kingSquare, color);
  const threatSquares = getThreatSquares(kingSquare, threatPieces);

  draft.state.king.checkDetails.threatPieces = threatPieces;
  draft.state.king.checkDetails.threatSquares = threatSquares;
}

function getThreatPieces(position, square, color) {
  const threatPieces = [];
  for (const pieceType of ['r', 'b', 'n', 'p']) {
    const { getMoves, pieces } = attackingPiecesData[pieceType];
    const moves = getMoves(square, color, position);
    const movePieces = moves.map((move) => getPieceAtSquare(position, move));

    for (const [i, piece] of movePieces.entries()) {
      if (piece && pieces.includes(piece.type) && piece.color !== color) {
        threatPieces.push({ piece, square: moves[i] });
      }
    }
  }
  return threatPieces;
}

function getIntermediateLines(type, startLine, endLine) {
  const lines = type === 'ranks' ? orderedRanks : files;
  const startLineIndex = lines.indexOf(startLine);
  const endLineIndex = lines.indexOf(endLine);
  const [loIndex, hiIndex] = [startLineIndex, endLineIndex].sort();
  const intermediateLines = lines.slice(loIndex + 1, hiIndex);

  if (startLine < endLine) return intermediateLines;
  return [...intermediateLines].reverse();
}

function getThreatSquares(attackedSquare, threatPieces) {
  const threatSquares = [];
  for (const threatPieceInfo of threatPieces) {
    const { piece: threatPiece, square: threatSquare } = threatPieceInfo;

    if (['n', 'p'].includes(threatPiece.type)) continue;

    const { rookLike, bishopLike } = isAttackRookOrBishopLike(
      threatPiece,
      attackedSquare,
      threatSquare
    );

    if (rookLike)
      threatSquares.push(...getThreatSquaresRook(threatSquare, attackedSquare));

    if (bishopLike)
      threatSquares.push(
        ...getThreatSquaresBishop(threatSquare, attackedSquare)
      );
  }
  return threatSquares;
}

function isAttackRookOrBishopLike(piece, attackedSquare, queenSquare) {
  if (piece.type === 'r') return { rookLike: true };
  if (piece.type === 'b') return { bishopLike: true };
  if (piece.type !== 'q') return {};

  if (
    queenSquare.rank === attackedSquare.rank ||
    queenSquare.file === attackedSquare.file
  ) {
    return { rookLike: true };
  }
  return { bishopLike: true };
}

function getThreatSquaresRook(threatSquare, attackedSquare) {
  if (threatSquare.rank !== attackedSquare.rank)
    return getIntermediateLines(
      'ranks',
      threatSquare.rank,
      attackedSquare.rank
    ).map((rank) => ({
      file: threatSquare.file,
      rank,
    }));
  return getIntermediateLines(
    'files',
    threatSquare.file,
    attackedSquare.file
  ).map((file) => ({
    file,
    rank: threatSquare.rank,
  }));
}

function getThreatSquaresBishop(threatSquare, attackedSquare) {
  const threatSquares = [];

  const intermediateRanks = getIntermediateLines(
    'ranks',
    threatSquare.rank,
    attackedSquare.rank
  );
  const intermediateFiles = getIntermediateLines(
    'files',
    threatSquare.file,
    attackedSquare.file
  );
  // eslint-disable-next-line unicorn/no-for-loop
  for (let i = 0; i < intermediateRanks.length; i++) {
    const rank = intermediateRanks[i];
    const file = intermediateFiles[i];
    threatSquares.push({ rank, file });
  }

  return threatSquares;
}
