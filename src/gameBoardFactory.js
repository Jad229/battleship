import shipFactory from "./shipFactory";

export default function gameboardFactory() {
  const boardSize = 10; // Potential idea: add different board sizes to play on
  const _board = Array(boardSize) // creates a board of size boardSize x boardSize
    .fill()
    .map(() => Array(boardSize).fill(null)); //using map to make sure that you can make changes to each array within the rows
  const missedAttacks = [];
  const ships = [];

  function placeShip(start, end, shipLength) {}
  function getBoard() {
    return _board;
  }
  return { placeShip, getBoard };
}
