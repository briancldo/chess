export type PieceColor = 'w' | 'b';
export type PieceType = 'k' | 'q' | 'r' | 'b' | 'n' | 'p';
export interface Piece {
  color: PieceColor;
  type: PieceType;
}
export type PieceSlot = Piece | undefined;

export type PieceString = `${PieceColor}${PieceType}`;
