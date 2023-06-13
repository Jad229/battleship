import playerFactory from "./playerFactory";

export default function computerFactory(name, gameboard) {
  const player = new playerFactory(name, gameboard);

  const randomAttack = () => {
    let coords;
    do {
      coords = _randomCoords();
    } while (!isLegalMove(coords));
    player.attack(coords);
  };

  const _randomCoords = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  return { ...player, randomAttack };
}
