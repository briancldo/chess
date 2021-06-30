import {
  GameResult,
  GameResultValue,
  GameWon,
  GameDrawn,
  GameResultMethod,
} from './board/board.types';

function isGameWon(result: GameResult): result is GameWon {
  return result.value === GameResultValue.won;
}

function isGameDrawn(result: GameResult): result is GameDrawn {
  return result.value === GameResultValue.drawn;
}

export function createGameOverMessage(result: GameResult) {
  const _method = getMethodLonghand(result.method);
  if (isGameDrawn(result)) {
    return `Draw by ${_method}.`;
  }
  if (isGameWon(result)) {
    const sideLong = result.side === 'w' ? 'White' : 'Black';
    return `${sideLong} wins by ${_method}.`;
  }
  return 'Game over.';
}

const methodMapping = {
  s: 'stalemate',
  c: 'checkmate',
};
function getMethodLonghand(methodShorthand: GameResultMethod) {
  return methodMapping[methodShorthand];
}
