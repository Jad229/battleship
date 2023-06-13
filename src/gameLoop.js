import computerFactory from "./factories/computerFactory";
import gameboardFactory from "./factories/gameboardFactory";
import playerFactory from "./factories/playerFactory";

function gameLoop() {
  // creating gameboards
  playerGameboard = new gameboardFactory();
  computerGameboard = new gameboardFactory();

  // creating players
  player = new playerFactory("player", playerGameboard);
  computer = new computerFactory("computer", computerGameboard);

  //TODO: implement placing of ships
  // Place player's ships
  playerBoard.placeShip([0, 0], [0, 2], 3);
  playerBoard.placeShip([1, 0], [1, 2], 3);

  // Place computer's ships
  computerBoard.placeShip([0, 0], [0, 2], 3);
  computerBoard.placeShip([1, 0], [1, 2], 3);

  // while both players still have ships continue the main loop
  while (!playerGameboard.allShipsSunk() && !computerGameboard.allShipsSunk()) {
    //TODO: player turn
    player.attack();

    if (playerGameboard.allShipsSunk() || computerGameboard.allShipsSunk()) {
      break;
    }

    //TODO: computer turn
    computer.randomAttack();

    if (playerGameboard.allShipsSunk() || computerGameboard.allShipsSunk()) {
      break;
    }
  }

  // Determine the winner
  if (playerBoard.allShipsSunk()) {
    return "Computer wins!";
  } else {
    return "Player wins!";
  }
}
