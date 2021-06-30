import {
  BoardRank,
  BoardFullRank,
  BoardSquare,
} from '../../../utils/board/board.types';
import { BoardData, BoardHandlers } from '../Board/Board.types';

export interface RankProps {
  number: BoardRank;
  fullRank: BoardFullRank;
  checkedSquare?: BoardSquare;
  handlers: BoardHandlers;
  data: BoardData;
}
