import { BoardRank, BoardFullRank, BoardSquare } from "../../utils/board.types";
import { BoardData, BoardHandlers } from "./Board.types";

export interface RankProps {
  number: BoardRank;
  fullRank: BoardFullRank;
  checkedSquare?: BoardSquare;
  handlers: BoardHandlers;
  data: BoardData;
}
