export type PieceColor = 'w' | 'b';
export type PieceColorFull = 'white' | 'black';
export type PieceType = 'k' | 'q' | 'r' | 'b' | 'n' | 'p';
export type PromotionPieceType = 'q' | 'r' | 'b' | 'n';
interface PieceBase {
  color: PieceColor;
  type: PieceType;
}
export interface PromotionPiece extends PieceBase {
  type: PromotionPieceType;
  promoted?: boolean;
}
export type Piece = PieceBase | PromotionPiece;

export type PieceSlot = Piece | undefined;

export type PieceString = `${PieceColor}${PieceType}`;
