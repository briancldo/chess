let gameOverHandled = false;
export function tempHandleGameOver(result) {
  if (gameOverHandled) return;

  const { value, side, method } = result;
  const _method = getMethodLonghand(method);

  if (value === '=') {
    alert(`Draw by ${_method}.`);
  }
  if (value === '+') {
    const sideLong = side === 'w' ? 'White' : 'Black';
    alert(`${sideLong} wins by ${_method}.`);
  }
  gameOverHandled = true;
}

const methodMapping = {
  s: 'stalemate',
  c: 'checkmate',
};
function getMethodLonghand(methodShorthand) {
  return methodMapping[methodShorthand];
}
