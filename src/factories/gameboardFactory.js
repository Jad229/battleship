import shipFactory from "./shipFactory";

export default function gameboardFactory() {
  const boardSize = 10; // Potential idea: add different board sizes to play on
  const _board = Array(boardSize) // creates a board of size boardSize x boardSize
    .fill()
    .map(() => Array(boardSize).fill(null)); //using map to make sure that you can make changes to each array within the rows
  const _missedAttacks = [];
  const ships = [];

  function placeShip(start, end, shipLength) {
    const ship = shipFactory(shipLength);

    // TODO: test for boundaries and make sure coordinates are valid
    //for each coordinate check if its between the board boundaries.
    if (_isValidCoords(start) && _isValidCoords(end)) {
      // If the start row and end row are the same the ship is being placed horizontally else it places vertically
      if (start[0] === end[0]) {
        //ship is horizontal
        // TODO: check if the space is free and if the ship can fit in the provided range.
        let shipSpace = _board[start[0]].slice(start[1], end[1] + 1); // slice row from start column to end column
        let isOverlap = shipSpace.some((space) => space !== null); //check if any of the spaces are not empty if so there is overlap
        let isCorrectLength = shipSpace.length === shipLength; //shipSpace.length should be equal to the shipLength

        // TODO: Add the ship to the board at the given coordinates.
        if (!isOverlap && isCorrectLength) {
          // let the counter equal the column indices
          for (let i = start[1]; i <= end[1]; i++) {
            _board[start[0]][i] = ship;
          }
        } else {
          return false; // If the ship placement is invalid, return false
        }
      } else if (start[1] === end[1]) {
        //ship is vertical

        let shipSpace = _board
          .map((row) => row[start[1]]) //using map because we want the elements of each column
          .slice(start[0], end[0] + 1);
        let isOverlap = shipSpace.some((space) => space !== null);
        let isCorrectLength = shipSpace.length === shipLength;
        if (!isOverlap && isCorrectLength) {
          // let the counter equal the row indices
          for (let i = start[0]; i <= end[0]; i++) {
            _board[i][start[1]] = ship;
          }
        } else {
          return false; // If the ship placement is invalid, return false
        }
      }

      ships.push(ship);
      return true; // If the ship placement is successful, return true
    }

    return false; // If the coordinates are invalid, return false
  }

  function _isValidCoords(coordinates) {
    return coordinates.every((coordinate) => {
      return coordinate >= 0 && coordinate <= 9;
    });
  }

  function receiveAttack(coordinates) {
    // TODO: Check if there's a ship at the given coordinates.
    let ship = _board[coordinates[0]][coordinates[1]];

    // If there is a ship there, call its `hit` method.
    if (ship !== null) {
      ship.hit();
    } else if (ship === null) {
      // If there isn't, add the coordinates to `missedAttacks`.
      _missedAttacks.push(coordinates.join(","));
    }
  }

  function allShipsSunk() {
    return ships.every((ship) => ship.isSunk());
  }

  function getMissedAttacks() {
    return _missedAttacks;
  }

  function getBoard() {
    return _board;
  }
  return { placeShip, getBoard, receiveAttack, allShipsSunk, getMissedAttacks };
}
