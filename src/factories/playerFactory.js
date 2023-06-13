export default function Player(name, gameboard) {
  const _name = name;
  const _gameboard = gameboard;
  const previousMoves = new Set(); // using a set since the attacks can only happen once

  const attack = (coords) => {
    if (_isLegalMove(coords)) {
      _gameboard.receiveAttack(coords);
      previousMoves.add(coords.join(","));
    } else {
      throw new Error("Invalid move");
    }
  };

  const _isLegalMove = (coords) => {
    return !_previousMoves.has(coords.join(","));
  };

  return { attack };
}
