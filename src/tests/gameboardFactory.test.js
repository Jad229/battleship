import gameboardFactory from "../gameBoardFactory";

test("Should return the initial state of the game board", () => {
  const gameboard = gameboardFactory();

  const board = gameboard.getBoard();

  // Check that the board is an array of the correct length
  expect(Array.isArray(board)).toBe(true);
  expect(board.length).toBe(10);

  // Check that each element of the board is also an array of the correct length
  board.forEach((row) => {
    expect(Array.isArray(row)).toBe(true);
    expect(row.length).toBe(10);
  });

  // Check that all elements of the board are initially null
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      expect(board[i][j]).toBe(null);
    }
  }
});

test("Should place ship of length 3 at (3,4) horizontally", () => {
  const gameboard = gameboardFactory();

  gameboard.placeShip([3, 4], [3, 6], 3);
  const board = gameboard.getBoard();

  expect(board[3][3]).toBeFalsy();
  expect(board[3][4]).toBeTruthy();
  expect(board[3][5]).toBeTruthy();
  expect(board[3][6]).toBeTruthy();
  expect(board[3][7]).toBeFalsy();
});

test("Should place ship of length 3 at (3,4) vertically", () => {
  const gameboard = gameboardFactory();

  gameboard.placeShip([3, 4], [5, 4], 3);
  const board = gameboard.getBoard();

  expect(board[2][4]).toBeFalsy();
  expect(board[3][4]).toBeTruthy();
  expect(board[4][4]).toBeTruthy();
  expect(board[5][4]).toBeTruthy();
  expect(board[6][4]).toBeFalsy();
});

test("Should not place ship of length 3 at (3,4) horizontally if there is already a ship there", () => {
  const gameboard = gameboardFactory();

  gameboard.placeShip([3, 4], [3, 6], 3);

  expect(() => {
    gameboard.placeShip([3, 4], [3, 6], 3);
  }).toThrowError("Invalid ship placement");
});

test("Should not place ship of length 3 at (3,4) vertically if there is already a ship there", () => {
  const gameboard = gameboardFactory();

  gameboard.placeShip([3, 4], [5, 4], 3);

  expect(() => {
    gameboard.placeShip([3, 4], [5, 4], 3);
  }).toThrowError("Invalid ship placement");
});

test("Should not place ship of length 3 at (3,4) horizontally if end coordinates are for a ship of length 2", () => {
  const gameboard = gameboardFactory();

  expect(() => {
    gameboard.placeShip([3, 4], [3, 5], 3);
  }).toThrowError("Invalid ship placement");
});

test("Should not place ship of length 3 at (3,4) vertically if end coordinates are for a ship of length 2", () => {
  const gameboard = gameboardFactory();

  expect(() => {
    gameboard.placeShip([3, 4], [4, 4], 3);
  }).toThrowError("Invalid ship placement");
});
