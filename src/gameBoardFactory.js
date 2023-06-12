import shipFactory from "./shipFactory";

export default function gameboardFactory() {
  const boardSize = 10; // Potential idea: add different board sizes to play on
  const _board = Array(boardSize) // creates a board of size boardSize x boardSize
    .fill()
    .map(() => Array(boardSize).fill(null)); //using map to make sure that you can make changes to each array within the rows
  const missedAttacks = [];
  const ships = [];

  function placeShip(start, end, shipLength) {
    const ship = shipFactory(shipLength);

    // TODO: check if the space is free and if the ship can fit in the provided range.
    // TODO: test for boundaries and make sure coordinates are valid

    // TODO: Add the ship to the board at the given coordinates.
    // if the start row and end row are the same the ship is being places horizontally else it places vertically
    if (start[0] == end[0]) {
      // let the counter equal the column indices
      for (let i = start[1]; i <= end[1]; i++) {
        _board[start[0]][i] = ship;
      }
    } else if (start[1] == end[1]) {
      // let the counter equal the row indices
      for (let i = start[0]; i <= end[0]; i++) {
        _board[i][start[1]] = ship;
      }
    }

    ships.push(ship);
  }
  function getBoard() {
    return _board;
  }
  return { placeShip, getBoard };
}
