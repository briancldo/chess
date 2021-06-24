import { PieceString } from '../../pieces.types';
import { Coordinate } from '../board.types';

export type ConcisePosition = {
  [pieceString in PieceString]?: Coordinate[] | Coordinate;
};

interface CreateBoardAllOptions {
  squaresPromotedPieces: Coordinate[];
}
export type CreateBoardOptions = Partial<CreateBoardAllOptions>;
