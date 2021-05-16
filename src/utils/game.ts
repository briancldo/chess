import { GameResult, GameResultValue, GameWon, GameDrawn, GameResultMethod } from './board.types';

function isGameWon(result: GameResult): result is GameWon {
  return result.value === GameResultValue.won;
}

function isGameDrawn(result: GameResult): result is GameDrawn {
  return result.value === GameResultValue.drawn;
}

let gameOverHandled = false;
export function tempHandleGameOver(result: GameResult) {
  if (gameOverHandled) return;

  const _method = getMethodLonghand(result.method);
  if (isGameDrawn(result)) {
    alert(`Draw by ${_method}.`);
  }
  if (isGameWon(result)) {
    const sideLong = result.side === 'w' ? 'White' : 'Black';
    alert(`${sideLong} wins by ${_method}.`);
  }
  gameOverHandled = true;
}

const methodMapping = {
  s: 'stalemate',
  c: 'checkmate',
};
function getMethodLonghand(methodShorthand: GameResultMethod) {
  return methodMapping[methodShorthand];
}
