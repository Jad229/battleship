import Player from "./playerFactory";

export default function computerFactory(name, gameboard) {
  const player = new Player(name, gameboard);

  const randomAttack = () => {
    let coords;
    do {
      coords = _randomCoords();
    } while (!_isLegalMove(coords));
    player.attack(coords);
  };

  const _randomCoords = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  return { ...player, randomAttack };
}
