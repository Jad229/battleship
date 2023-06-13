export default function playerFactory(name, gameboard) {
  const _name = name;
  const _gameboard = gameboard;
  const previousMoves = new Set(); // using a set since the attacks can only happen once

  const attack = (coords) => {
    if (isLegalMove(coords)) {
      _gameboard.receiveAttack(coords);
      previousMoves.add(coords.join(","));
    } else {
      throw new Error("Invalid move");
    }
  };

  const isLegalMove = (coords) => {
    return !_previousMoves.has(coords.join(","));
  };

  const getGameboard = () => {
    return _gameboard;
  };

  return { attack, isLegalMove, getGameboard };
}
