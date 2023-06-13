import computerFactory from "./factories/computerFactory";
import gameboardFactory from "./factories/gameboardFactory";
import playerFactory from "./factories/playerFactory";
import "./public/styles.css";
import renderBoard from "./ui/renderBoard";

const playerBoardContainer = document.getElementById("player-board");
const computerBoardContainer = document.getElementById("computer-board");

// creating gameboards
const playerGameboard = gameboardFactory();
const computerGameboard = gameboardFactory();

// creating players
const player = playerFactory("player", playerGameboard);
const computer = computerFactory("computer", computerGameboard);

renderBoard(playerGameboard, playerBoardContainer);
renderBoard(computerGameboard, computerBoardContainer);

//TODO: implement placing of ships
// Place player's ships
playerGameboard.placeShip([0, 0], [0, 2], 3);
playerGameboard.placeShip([1, 0], [1, 2], 3);

// Place computer's ships
computerGameboard.placeShip([0, 0], [0, 2], 3);
computerGameboard.placeShip([1, 0], [1, 2], 3);

// // while both players still have ships continue the main loop
// while (!playerGameboard.allShipsSunk() && !computerGameboard.allShipsSunk()) {
//   //TODO: player turn
//   player.attack();

//   if (playerGameboard.allShipsSunk() || computerGameboard.allShipsSunk()) {
//     break;
//   }

//   //TODO: computer turn
//   computer.randomAttack();

//   if (playerGameboard.allShipsSunk() || computerGameboard.allShipsSunk()) {
//     break;
//   }
// }

// // Determine the winner
// if (playerBoard.allShipsSunk()) {
//   console.log("Computer wins!");
// } else {
//   console.log("Player wins!");
// }
