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
