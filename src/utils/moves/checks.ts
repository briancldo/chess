import { Draft, produce } from 'immer';
import {
  getPieceAtSquare,
  matchingSquares,
  orderedRanks,
  files,
  getCheckedSide,
  getKingSquare,
} from '../board';
import {
  Board,
  BoardFile,
  BoardRank,
  BoardSquare,
  BoardState,
  ThreatPiece,
} from '../board.types';
import { DevError } from '../errors';
import { Piece, PieceColor } from '../pieces.types';
import { isSquareAttacked, attackingPiecesData } from './utils';

export function excludeIllegalSquares(
  candidates: BoardSquare[],
  board: Board,
  piece: Piece,
  square: BoardSquare
) {
  if (getCheckedSide(board.state))
    candidates = excludeNonCheckHandlingSquares(candidates, board.state, piece);
  candidates = excludeUnpinSquares(candidates, board, piece, square);

  return candidates;
}

// -------------------------------------------------------------------

export function excludeNonCheckHandlingSquares(
  candidates: BoardSquare[],
  boardState: BoardState,
  piece: Piece
) {
  const checkHandlingSquares = [];
  checkHandlingSquares.push(
    ...excludeNonBlockOrCaptureSquares(candidates, boardState, piece),
    ...excludeNonKingMoveSquares(candidates, boardState, piece)
  );
  return checkHandlingSquares;
}

function excludeNonBlockOrCaptureSquares(
  candidates: BoardSquare[],
  boardState: BoardState,
  piece: Piece
) {
  const { threatPieces, threatSquares } = boardState.king.checkDetails;
  if (piece.type === 'k') return [];
  if (threatPieces.length > 1) return [];
  if (!threatPieces[0])
    throw new DevError('At least one piece should attack the king.');

  const allBlockOrCaptureSquares = [threatPieces[0].square, ...threatSquares];
  return candidates.filter((candidate) =>
    allBlockOrCaptureSquares.some((blockOrCaptureSquare) =>
      matchingSquares(blockOrCaptureSquare, candidate)
    )
  );
}

function excludeNonKingMoveSquares(
  candidates: BoardSquare[],
  boardState: BoardState,
  piece: Piece
) {
  if (piece.type !== 'k') return [];

  const threatSquares = boardState.king.checkDetails.threatSquares;
  return candidates.filter(
    (candidate) =>
      !threatSquares.some((threatSquare) =>
        matchingSquares(threatSquare, candidate)
      )
  );
}

// -------------------------------------------------------------------

function excludeUnpinSquares(
  candidates: BoardSquare[],
  board: Board,
  piece: Piece,
  square: BoardSquare
) {
  if (piece.type === 'k') return candidates;

  let boardWithoutPiece = produce(board, (draft) => {
    draft.position[square.rank][square.file] = undefined;
  });

  const kingSquare = getKingSquare(board.state, piece.color);
  const isKingCheckedWithoutPiece = isSquareAttacked(
    kingSquare,
    piece.color,
    boardWithoutPiece
  );
  if (!isKingCheckedWithoutPiece) return candidates;

  boardWithoutPiece = produce(boardWithoutPiece, (draft) => {
    setCheckDetails(draft, kingSquare, piece.color);
  });
  const {
    threatPieces,
    threatSquares,
  } = boardWithoutPiece.state.king.checkDetails;
  const pinLineSquares = [...threatSquares];
  if (threatPieces.length === 1)
    pinLineSquares.push(threatPieces[0]?.square as BoardSquare);
  return candidates.filter((square) =>
    pinLineSquares.some((pinLineSquare) =>
      matchingSquares(square, pinLineSquare)
    )
  );
}

// -------------------------------------------------------------------

export function excludeCheckingSquares(
  candidates: BoardSquare[],
  board: Board,
  pieceColor: PieceColor
) {
  const { state: boardState } = board;
  const kingSquare = boardState.king[pieceColor].square;
  const boardWithoutKing = produce(board, (draft) => {
    draft.position[kingSquare.rank][kingSquare.file] = undefined;
  });

  return candidates.filter(
    (candidate) => !isSquareAttacked(candidate, pieceColor, boardWithoutKing)
  );
}

// -------------------------------------------------------------------

export function setCheckDetails(
  draft: Draft<Board>,
  kingSquare: BoardSquare,
  color: PieceColor
) {
  const threatPieces = getThreatPieces(draft, kingSquare, color);
  const threatSquares = getThreatSquares(kingSquare, threatPieces);

  draft.state.king.checkDetails.threatPieces = threatPieces;
  draft.state.king.checkDetails.threatSquares = threatSquares;
}

const attackingPieces = ['r', 'b', 'n', 'p'] as const;
function getThreatPieces(
  board: Board,
  square: BoardSquare,
  color: PieceColor
): ThreatPiece[] {
  const threatPieces = [];
  for (const pieceType of attackingPieces) {
    const { position } = board;
    const { getMoves, pieces } = attackingPiecesData[pieceType];
    const moves = getMoves(square, color, board);
    const movePieces = moves.map((move) => getPieceAtSquare(position, move));

    for (const [i, piece] of movePieces.entries()) {
      if (piece && pieces.includes(piece.type) && piece.color !== color) {
        threatPieces.push({ piece, square: moves[i] as BoardSquare });
      }
    }
  }
  return threatPieces;
}

function getIntermediateRanks(startRank: BoardRank, endRank: BoardRank) {
  const startRankIndex = orderedRanks.indexOf(startRank);
  const endRankIndex = orderedRanks.indexOf(endRank);
  const [loIndex, hiIndex] = [startRankIndex, endRankIndex].sort() as [
    number,
    number
  ];
  const intermediateRanks = orderedRanks.slice(loIndex + 1, hiIndex);

  if (startRank < endRank) return intermediateRanks;
  return [...intermediateRanks].reverse();
}
function getIntermediateFiles(startFile: BoardFile, endFile: BoardFile) {
  const startFileIndex = files.indexOf(startFile);
  const endFileIndex = files.indexOf(endFile);
  const [loIndex, hiIndex] = [startFileIndex, endFileIndex].sort() as [
    number,
    number
  ];
  const intermediateFiles = files.slice(loIndex + 1, hiIndex);

  if (startFile < endFile) return intermediateFiles;
  return [...intermediateFiles].reverse();
}

function getThreatSquares(
  attackedSquare: BoardSquare,
  threatPieces: ThreatPiece[]
) {
  const threatSquares: BoardSquare[] = [];
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

function isAttackRookOrBishopLike(
  piece: Piece,
  attackedSquare: BoardSquare,
  queenSquare: BoardSquare
) {
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

function getThreatSquaresRook(
  threatSquare: BoardSquare,
  attackedSquare: BoardSquare
) {
  if (threatSquare.rank !== attackedSquare.rank)
    return getIntermediateRanks(threatSquare.rank, attackedSquare.rank).map(
      (rank) => ({
        file: threatSquare.file,
        rank,
      })
    );
  return getIntermediateFiles(threatSquare.file, attackedSquare.file).map(
    (file) => ({
      file,
      rank: threatSquare.rank,
    })
  );
}

function getThreatSquaresBishop(
  threatSquare: BoardSquare,
  attackedSquare: BoardSquare
) {
  const threatSquares: BoardSquare[] = [];

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
    const rank = intermediateRanks[i] as BoardRank;
    const file = intermediateFiles[i] as BoardFile;
    threatSquares.push({ rank, file });
  }

  return threatSquares;
}
