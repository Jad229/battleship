import computerFactory from "./factories/computerFactory";
import gameboardFactory from "./factories/gameboardFactory";
import playerFactory from "./factories/playerFactory";
import shipFactory from "./factories/shipFactory";
import "./public/styles.css";
import renderBoard from "./ui/renderBoard";

const playerBoardContainer = document.getElementById("player-board");
const computerBoardContainer = document.getElementById("computer-board");

// creating gameboards
const playerBoard = gameboardFactory();
const computerBoard = gameboardFactory();

// creating players
const player = playerFactory("player", playerBoard);
const computer = computerFactory("computer", computerBoard);

// render the boards
renderBoard(playerBoard, playerBoardContainer);
renderBoard(computerBoard, computerBoardContainer);

// Ship initializations
const shipNames = [
  "cruiser",
  "destroyer",
  "submarine",
  "battleship",
  "carrier",
];
const ships = shipNames.map((shipName, idx) => shipFactory(shipName, idx + 1));

function addShipToBoard(start, end, shipName, boardId, direction) {
  const startX = Math.min(start[0], end[0]);
  const endX = Math.max(start[0], end[0]);
  const startY = Math.min(start[1], end[1]);
  const endY = Math.max(start[1], end[1]);

  if (direction === 0) {
    for (let i = startY; i <= endY; i++) {
      const cellElement = document.querySelector(
        `#${boardId} div[data-x='${startX}'][data-y='${i}']`
      );
      cellElement.classList.add(shipName);
      cellElement.classList.add("taken");
    }
  } else {
    for (let i = startX; i <= endX; i++) {
      const cellElement = document.querySelector(
        `#${boardId} div[data-x='${i}'][data-y='${startY}']`
      );
      cellElement.classList.add(shipName);
      cellElement.classList.add("taken");
    }
  }
}

function addComputerShips() {
  ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      const [start, end] = generateRandomShipCoords(ship.getLength());
      placed = computerBoard.placeShip(start, end, ship.getLength());

      if (placed) {
        addShipToBoard(
          start,
          end,
          ship.getName(),
          "computer-board",
          start[0] === end[0] ? 0 : 1
        );
      }
    }
  });
}

function generateRandomShipCoords(shipLength) {
  // Choose a random direction (0 for horizontal, 1 for vertical)
  const direction = Math.floor(Math.random() * 2);

  let start, end;

  if (direction === 0) {
    // Horizontal direction
    start = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * (10 - shipLength)),
    ];
    end = [start[0], start[1] + shipLength - 1];
  } else {
    // Vertical direction
    start = [
      Math.floor(Math.random() * (10 - shipLength)),
      Math.floor(Math.random() * 10),
    ];
    end = [start[0] + shipLength - 1, start[1]];
  }

  return [start, end];
}

const flipButton = document.getElementById("flip-button");
let angle = 0;

function flip() {
  const optionsContainer = document.querySelector(".options-section");
  const options = Array.from(optionsContainer.children);

  angle = angle === 0 ? 90 : 0;
  options.forEach((option) => {
    option.style.transform = `rotate(${angle}deg)`;
  });
}

flipButton.addEventListener("click", flip);

const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
  addComputerShips();
});

// Drag player ships
let draggedShip;
const shipOptions = Array.from(
  document.querySelector(".options-section").children
);

shipOptions.forEach((ship) => ship.addEventListener("dragstart", dragStart));

const allPlayerCells = document.querySelectorAll("#player-board div");
allPlayerCells.forEach((cell) => {
  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("drop", dropShip);
});

function dragStart(e) {
  draggedShip = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dropShip(e) {
  const ship = ships[draggedShip.id];
  const shipLength = ship.getLength();
  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);

  let start;
  let end;

  // Determine the start and end coordinates based on the ship length and the orientation (horizontal or vertical)
  if (angle === 0) {
    // If the angle is 0, the ship is placed horizontally
    start = [x, y];
    end = [x, y + shipLength - 1];
  } else {
    // If the angle is 90, the ship is placed vertically
    start = [x, y];
    end = [x + shipLength - 1, y];
  }

  // Call placeShip with the coordinates
  if (playerBoard.placeShip(start, end, shipLength)) {
    // If the ship was successfully placed, add it visually
    if (angle === 0) {
      addShipToBoard(
        start,
        end,
        ship.getName(),
        "player-board",
        angle === 0 ? 0 : 1
      );
      draggedShip.remove();
    } else {
      addShipToBoard(
        start,
        end,
        ship.getName(),
        "player-board",
        angle === 0 ? 0 : 1
      );
      draggedShip.remove();
    }
  } else {
    return;
  }
}
