import { BoardRank, BoardFullRank, BoardSquare } from "../../utils/board.types";

export interface RankProps {
  number: BoardRank;
  fullRank: BoardFullRank;
  checkedSquare?: BoardSquare;
  handlers: any;
  data: any;
}
