"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./src/factories/computerFactory.js":
/*!******************************************!*\
  !*** ./src/factories/computerFactory.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computerFactory)
/* harmony export */ });
/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerFactory */ "./src/factories/playerFactory.js");


function computerFactory(name, gameboard) {
  const player = new _playerFactory__WEBPACK_IMPORTED_MODULE_0__["default"](name, gameboard);

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


/***/ }),

/***/ "./src/factories/gameboardFactory.js":
/*!*******************************************!*\
  !*** ./src/factories/gameboardFactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameboardFactory)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/factories/shipFactory.js");


function gameboardFactory() {
  const boardSize = 10; // Potential idea: add different board sizes to play on
  const _board = Array(boardSize) // creates a board of size boardSize x boardSize
    .fill()
    .map(() => Array(boardSize).fill(null)); //using map to make sure that you can make changes to each array within the rows
  const _missedAttacks = [];
  const ships = [];

  function placeShip(start, end, shipLength) {
    const ship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(shipLength);

    // TODO: test for boundaries and make sure coordinates are valid
    //for each coordinate check if its between the board boundaries.
    if (_isValidCoords(start) && _isValidCoords(end)) {
      // if the start row and end row are the same the ship is being placed horizontally else it places vertically
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
          throw new Error("Invalid ship placement");
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
          throw new Error("Invalid ship placement");
        }
      }

      ships.push(ship);
    }
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


/***/ }),

/***/ "./src/factories/playerFactory.js":
/*!****************************************!*\
  !*** ./src/factories/playerFactory.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ playerFactory)
/* harmony export */ });
function playerFactory(name, gameboard) {
  const _name = name;
  const _gameboard = gameboard;
  const previousMoves = new Set(); // using a set since the attacks can only happen once

  const attack = (coords) => {
    if (isLegalMove(coords)) {
      _gameboard.receiveAttack(coords);
      previousMoves.add(coords.join(","));
    } else {
      throw new Error("Invalid move");
    }
  };

  const isLegalMove = (coords) => {
    return !_previousMoves.has(coords.join(","));
  };

  const getGameboard = () => {
    return _gameboard;
  };

  return { attack, isLegalMove, getGameboard };
}


/***/ }),

/***/ "./src/factories/shipFactory.js":
/*!**************************************!*\
  !*** ./src/factories/shipFactory.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shipFactory)
/* harmony export */ });
function shipFactory(length) {
  let _hitCount = 0;
  const hit = () => {
    return ++_hitCount;
  };
  const isSunk = () => {
    if (_hitCount == length) return true;
    else return false;
  };
  const getHitCount = () => {
    return _hitCount;
  };
  return {
    hit,
    isSunk,
    getHitCount,
  };
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories_computerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/computerFactory */ "./src/factories/computerFactory.js");
/* harmony import */ var _factories_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/gameboardFactory */ "./src/factories/gameboardFactory.js");
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/playerFactory */ "./src/factories/playerFactory.js");
/* harmony import */ var _ui_renderBoard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/renderBoard */ "./src/ui/renderBoard.js");





const playerBoardContainer = document.getElementById("player-board");
const computerBoardContainer = document.getElementById("computer-board");

// creating gameboards
playerGameboard = new _factories_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__["default"]();
computerGameboard = new _factories_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__["default"]();

// creating players
player = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_2__["default"]("player", playerGameboard);
computer = new _factories_computerFactory__WEBPACK_IMPORTED_MODULE_0__["default"]("computer", computerGameboard);

(0,_ui_renderBoard__WEBPACK_IMPORTED_MODULE_3__["default"])(playerGameboard, playerBoardContainer);
(0,_ui_renderBoard__WEBPACK_IMPORTED_MODULE_3__["default"])(computerGameboard, computerBoardContainer);

//TODO: implement placing of ships
// Place player's ships
playerBoard.placeShip([0, 0], [0, 2], 3);
playerBoard.placeShip([1, 0], [1, 2], 3);

// Place computer's ships
computerGameboard.placeShip([0, 0], [0, 2], 3);
computerGameboard.placeShip([1, 0], [1, 2], 3);

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
  console.log("Computer wins!");
} else {
  console.log("Player wins!");
}


/***/ }),

/***/ "./src/ui/renderBoard.js":
/*!*******************************!*\
  !*** ./src/ui/renderBoard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderBoard)
/* harmony export */ });
function renderBoard(board, container) {
  //Clear the container
  container.innerHTML = "";

  //Create a new element for each cell in the board and append it to the container
  board.getBoard().forEach((row, i) => {
    row.forEach((cell, j) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

      // Add a 'hit' class to the cell if it's been hit
      if (cell !== null && cell.getHitCount() > 0) {
        cellElement.classList.add("hit");
      }

      container.appendChild(cellElement);
    });
  });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFDNUM7QUFDZTtBQUNmLHFCQUFxQixzREFBYTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCd0M7QUFDeEM7QUFDZTtBQUNmLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHdEQUFXO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEUsbUVBQW1FO0FBQ25FLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxhQUFhO0FBQzlDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsYUFBYTtBQUM5QztBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUN0RmU7QUFDZjtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUN2QmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakIwRDtBQUNFO0FBQ047QUFDWDtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1FQUFnQjtBQUN0Qyx3QkFBd0IsbUVBQWdCO0FBQ3hDO0FBQ0E7QUFDQSxhQUFhLGdFQUFhO0FBQzFCLGVBQWUsa0VBQWU7QUFDOUI7QUFDQSwyREFBVztBQUNYLDJEQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xEZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jb21wdXRlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy91aS9yZW5kZXJCb2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGxheWVyRmFjdG9yeSBmcm9tIFwiLi9wbGF5ZXJGYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlckZhY3RvcnkobmFtZSwgZ2FtZWJvYXJkKSB7XHJcbiAgY29uc3QgcGxheWVyID0gbmV3IHBsYXllckZhY3RvcnkobmFtZSwgZ2FtZWJvYXJkKTtcclxuXHJcbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gKCkgPT4ge1xyXG4gICAgbGV0IGNvb3JkcztcclxuICAgIGRvIHtcclxuICAgICAgY29vcmRzID0gX3JhbmRvbUNvb3JkcygpO1xyXG4gICAgfSB3aGlsZSAoIWlzTGVnYWxNb3ZlKGNvb3JkcykpO1xyXG4gICAgcGxheWVyLmF0dGFjayhjb29yZHMpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IF9yYW5kb21Db29yZHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIHJldHVybiBbeCwgeV07XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgLi4ucGxheWVyLCByYW5kb21BdHRhY2sgfTtcclxufVxyXG4iLCJpbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVib2FyZEZhY3RvcnkoKSB7XHJcbiAgY29uc3QgYm9hcmRTaXplID0gMTA7IC8vIFBvdGVudGlhbCBpZGVhOiBhZGQgZGlmZmVyZW50IGJvYXJkIHNpemVzIHRvIHBsYXkgb25cclxuICBjb25zdCBfYm9hcmQgPSBBcnJheShib2FyZFNpemUpIC8vIGNyZWF0ZXMgYSBib2FyZCBvZiBzaXplIGJvYXJkU2l6ZSB4IGJvYXJkU2l6ZVxyXG4gICAgLmZpbGwoKVxyXG4gICAgLm1hcCgoKSA9PiBBcnJheShib2FyZFNpemUpLmZpbGwobnVsbCkpOyAvL3VzaW5nIG1hcCB0byBtYWtlIHN1cmUgdGhhdCB5b3UgY2FuIG1ha2UgY2hhbmdlcyB0byBlYWNoIGFycmF5IHdpdGhpbiB0aGUgcm93c1xyXG4gIGNvbnN0IF9taXNzZWRBdHRhY2tzID0gW107XHJcbiAgY29uc3Qgc2hpcHMgPSBbXTtcclxuXHJcbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHN0YXJ0LCBlbmQsIHNoaXBMZW5ndGgpIHtcclxuICAgIGNvbnN0IHNoaXAgPSBzaGlwRmFjdG9yeShzaGlwTGVuZ3RoKTtcclxuXHJcbiAgICAvLyBUT0RPOiB0ZXN0IGZvciBib3VuZGFyaWVzIGFuZCBtYWtlIHN1cmUgY29vcmRpbmF0ZXMgYXJlIHZhbGlkXHJcbiAgICAvL2ZvciBlYWNoIGNvb3JkaW5hdGUgY2hlY2sgaWYgaXRzIGJldHdlZW4gdGhlIGJvYXJkIGJvdW5kYXJpZXMuXHJcbiAgICBpZiAoX2lzVmFsaWRDb29yZHMoc3RhcnQpICYmIF9pc1ZhbGlkQ29vcmRzKGVuZCkpIHtcclxuICAgICAgLy8gaWYgdGhlIHN0YXJ0IHJvdyBhbmQgZW5kIHJvdyBhcmUgdGhlIHNhbWUgdGhlIHNoaXAgaXMgYmVpbmcgcGxhY2VkIGhvcml6b250YWxseSBlbHNlIGl0IHBsYWNlcyB2ZXJ0aWNhbGx5XHJcbiAgICAgIGlmIChzdGFydFswXSA9PT0gZW5kWzBdKSB7XHJcbiAgICAgICAgLy9zaGlwIGlzIGhvcml6b250YWxcclxuICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiB0aGUgc3BhY2UgaXMgZnJlZSBhbmQgaWYgdGhlIHNoaXAgY2FuIGZpdCBpbiB0aGUgcHJvdmlkZWQgcmFuZ2UuXHJcbiAgICAgICAgbGV0IHNoaXBTcGFjZSA9IF9ib2FyZFtzdGFydFswXV0uc2xpY2Uoc3RhcnRbMV0sIGVuZFsxXSArIDEpOyAvLyBzbGljZSByb3cgZnJvbSBzdGFydCBjb2x1bW4gdG8gZW5kIGNvbHVtblxyXG4gICAgICAgIGxldCBpc092ZXJsYXAgPSBzaGlwU3BhY2Uuc29tZSgoc3BhY2UpID0+IHNwYWNlICE9PSBudWxsKTsgLy9jaGVjayBpZiBhbnkgb2YgdGhlIHNwYWNlcyBhcmUgbm90IGVtcHR5IGlmIHNvIHRoZXJlIGlzIG92ZXJsYXBcclxuICAgICAgICBsZXQgaXNDb3JyZWN0TGVuZ3RoID0gc2hpcFNwYWNlLmxlbmd0aCA9PT0gc2hpcExlbmd0aDsgLy9zaGlwU3BhY2UubGVuZ3RoIHNob3VsZCBiZSBlcXVhbCB0byB0aGUgc2hpcExlbmd0aFxyXG5cclxuICAgICAgICAvLyBUT0RPOiBBZGQgdGhlIHNoaXAgdG8gdGhlIGJvYXJkIGF0IHRoZSBnaXZlbiBjb29yZGluYXRlcy5cclxuICAgICAgICBpZiAoIWlzT3ZlcmxhcCAmJiBpc0NvcnJlY3RMZW5ndGgpIHtcclxuICAgICAgICAgIC8vIGxldCB0aGUgY291bnRlciBlcXVhbCB0aGUgY29sdW1uIGluZGljZXNcclxuICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydFsxXTsgaSA8PSBlbmRbMV07IGkrKykge1xyXG4gICAgICAgICAgICBfYm9hcmRbc3RhcnRbMF1dW2ldID0gc2hpcDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzaGlwIHBsYWNlbWVudFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnRbMV0gPT09IGVuZFsxXSkge1xyXG4gICAgICAgIC8vc2hpcCBpcyB2ZXJ0aWNhbFxyXG5cclxuICAgICAgICBsZXQgc2hpcFNwYWNlID0gX2JvYXJkXHJcbiAgICAgICAgICAubWFwKChyb3cpID0+IHJvd1tzdGFydFsxXV0pIC8vdXNpbmcgbWFwIGJlY2F1c2Ugd2Ugd2FudCB0aGUgZWxlbWVudHMgb2YgZWFjaCBjb2x1bW5cclxuICAgICAgICAgIC5zbGljZShzdGFydFswXSwgZW5kWzBdICsgMSk7XHJcbiAgICAgICAgbGV0IGlzT3ZlcmxhcCA9IHNoaXBTcGFjZS5zb21lKChzcGFjZSkgPT4gc3BhY2UgIT09IG51bGwpO1xyXG4gICAgICAgIGxldCBpc0NvcnJlY3RMZW5ndGggPSBzaGlwU3BhY2UubGVuZ3RoID09PSBzaGlwTGVuZ3RoO1xyXG4gICAgICAgIGlmICghaXNPdmVybGFwICYmIGlzQ29ycmVjdExlbmd0aCkge1xyXG4gICAgICAgICAgLy8gbGV0IHRoZSBjb3VudGVyIGVxdWFsIHRoZSByb3cgaW5kaWNlc1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0WzBdOyBpIDw9IGVuZFswXTsgaSsrKSB7XHJcbiAgICAgICAgICAgIF9ib2FyZFtpXVtzdGFydFsxXV0gPSBzaGlwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNoaXAgcGxhY2VtZW50XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9pc1ZhbGlkQ29vcmRzKGNvb3JkaW5hdGVzKSB7XHJcbiAgICByZXR1cm4gY29vcmRpbmF0ZXMuZXZlcnkoKGNvb3JkaW5hdGUpID0+IHtcclxuICAgICAgcmV0dXJuIGNvb3JkaW5hdGUgPj0gMCAmJiBjb29yZGluYXRlIDw9IDk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcclxuICAgIC8vIFRPRE86IENoZWNrIGlmIHRoZXJlJ3MgYSBzaGlwIGF0IHRoZSBnaXZlbiBjb29yZGluYXRlcy5cclxuICAgIGxldCBzaGlwID0gX2JvYXJkW2Nvb3JkaW5hdGVzWzBdXVtjb29yZGluYXRlc1sxXV07XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBzaGlwIHRoZXJlLCBjYWxsIGl0cyBgaGl0YCBtZXRob2QuXHJcbiAgICBpZiAoc2hpcCAhPT0gbnVsbCkge1xyXG4gICAgICBzaGlwLmhpdCgpO1xyXG4gICAgfSBlbHNlIGlmIChzaGlwID09PSBudWxsKSB7XHJcbiAgICAgIC8vIElmIHRoZXJlIGlzbid0LCBhZGQgdGhlIGNvb3JkaW5hdGVzIHRvIGBtaXNzZWRBdHRhY2tzYC5cclxuICAgICAgX21pc3NlZEF0dGFja3MucHVzaChjb29yZGluYXRlcy5qb2luKFwiLFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbGxTaGlwc1N1bmsoKSB7XHJcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0TWlzc2VkQXR0YWNrcygpIHtcclxuICAgIHJldHVybiBfbWlzc2VkQXR0YWNrcztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldEJvYXJkKCkge1xyXG4gICAgcmV0dXJuIF9ib2FyZDtcclxuICB9XHJcbiAgcmV0dXJuIHsgcGxhY2VTaGlwLCBnZXRCb2FyZCwgcmVjZWl2ZUF0dGFjaywgYWxsU2hpcHNTdW5rLCBnZXRNaXNzZWRBdHRhY2tzIH07XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyRmFjdG9yeShuYW1lLCBnYW1lYm9hcmQpIHtcclxuICBjb25zdCBfbmFtZSA9IG5hbWU7XHJcbiAgY29uc3QgX2dhbWVib2FyZCA9IGdhbWVib2FyZDtcclxuICBjb25zdCBwcmV2aW91c01vdmVzID0gbmV3IFNldCgpOyAvLyB1c2luZyBhIHNldCBzaW5jZSB0aGUgYXR0YWNrcyBjYW4gb25seSBoYXBwZW4gb25jZVxyXG5cclxuICBjb25zdCBhdHRhY2sgPSAoY29vcmRzKSA9PiB7XHJcbiAgICBpZiAoaXNMZWdhbE1vdmUoY29vcmRzKSkge1xyXG4gICAgICBfZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcclxuICAgICAgcHJldmlvdXNNb3Zlcy5hZGQoY29vcmRzLmpvaW4oXCIsXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbW92ZVwiKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBpc0xlZ2FsTW92ZSA9IChjb29yZHMpID0+IHtcclxuICAgIHJldHVybiAhX3ByZXZpb3VzTW92ZXMuaGFzKGNvb3Jkcy5qb2luKFwiLFwiKSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIF9nYW1lYm9hcmQ7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgYXR0YWNrLCBpc0xlZ2FsTW92ZSwgZ2V0R2FtZWJvYXJkIH07XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hpcEZhY3RvcnkobGVuZ3RoKSB7XHJcbiAgbGV0IF9oaXRDb3VudCA9IDA7XHJcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuICsrX2hpdENvdW50O1xyXG4gIH07XHJcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xyXG4gICAgaWYgKF9oaXRDb3VudCA9PSBsZW5ndGgpIHJldHVybiB0cnVlO1xyXG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuICBjb25zdCBnZXRIaXRDb3VudCA9ICgpID0+IHtcclxuICAgIHJldHVybiBfaGl0Q291bnQ7XHJcbiAgfTtcclxuICByZXR1cm4ge1xyXG4gICAgaGl0LFxyXG4gICAgaXNTdW5rLFxyXG4gICAgZ2V0SGl0Q291bnQsXHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgY29tcHV0ZXJGYWN0b3J5IGZyb20gXCIuL2ZhY3Rvcmllcy9jb21wdXRlckZhY3RvcnlcIjtcclxuaW1wb3J0IGdhbWVib2FyZEZhY3RvcnkgZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVib2FyZEZhY3RvcnlcIjtcclxuaW1wb3J0IHBsYXllckZhY3RvcnkgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllckZhY3RvcnlcIjtcclxuaW1wb3J0IHJlbmRlckJvYXJkIGZyb20gXCIuL3VpL3JlbmRlckJvYXJkXCI7XHJcblxyXG5jb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLWJvYXJkXCIpO1xyXG5jb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlci1ib2FyZFwiKTtcclxuXHJcbi8vIGNyZWF0aW5nIGdhbWVib2FyZHNcclxucGxheWVyR2FtZWJvYXJkID0gbmV3IGdhbWVib2FyZEZhY3RvcnkoKTtcclxuY29tcHV0ZXJHYW1lYm9hcmQgPSBuZXcgZ2FtZWJvYXJkRmFjdG9yeSgpO1xyXG5cclxuLy8gY3JlYXRpbmcgcGxheWVyc1xyXG5wbGF5ZXIgPSBuZXcgcGxheWVyRmFjdG9yeShcInBsYXllclwiLCBwbGF5ZXJHYW1lYm9hcmQpO1xyXG5jb21wdXRlciA9IG5ldyBjb21wdXRlckZhY3RvcnkoXCJjb21wdXRlclwiLCBjb21wdXRlckdhbWVib2FyZCk7XHJcblxyXG5yZW5kZXJCb2FyZChwbGF5ZXJHYW1lYm9hcmQsIHBsYXllckJvYXJkQ29udGFpbmVyKTtcclxucmVuZGVyQm9hcmQoY29tcHV0ZXJHYW1lYm9hcmQsIGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xyXG5cclxuLy9UT0RPOiBpbXBsZW1lbnQgcGxhY2luZyBvZiBzaGlwc1xyXG4vLyBQbGFjZSBwbGF5ZXIncyBzaGlwc1xyXG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoWzAsIDBdLCBbMCwgMl0sIDMpO1xyXG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoWzEsIDBdLCBbMSwgMl0sIDMpO1xyXG5cclxuLy8gUGxhY2UgY29tcHV0ZXIncyBzaGlwc1xyXG5jb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoWzAsIDBdLCBbMCwgMl0sIDMpO1xyXG5jb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoWzEsIDBdLCBbMSwgMl0sIDMpO1xyXG5cclxuLy8gd2hpbGUgYm90aCBwbGF5ZXJzIHN0aWxsIGhhdmUgc2hpcHMgY29udGludWUgdGhlIG1haW4gbG9vcFxyXG53aGlsZSAoIXBsYXllckdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSAmJiAhY29tcHV0ZXJHYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAvL1RPRE86IHBsYXllciB0dXJuXHJcbiAgcGxheWVyLmF0dGFjaygpO1xyXG5cclxuICBpZiAocGxheWVyR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICBicmVhaztcclxuICB9XHJcblxyXG4gIC8vVE9ETzogY29tcHV0ZXIgdHVyblxyXG4gIGNvbXB1dGVyLnJhbmRvbUF0dGFjaygpO1xyXG5cclxuICBpZiAocGxheWVyR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IGNvbXB1dGVyR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XHJcbiAgICBicmVhaztcclxuICB9XHJcbn1cclxuXHJcbi8vIERldGVybWluZSB0aGUgd2lubmVyXHJcbmlmIChwbGF5ZXJCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xyXG4gIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXIgd2lucyFcIik7XHJcbn0gZWxzZSB7XHJcbiAgY29uc29sZS5sb2coXCJQbGF5ZXIgd2lucyFcIik7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyQm9hcmQoYm9hcmQsIGNvbnRhaW5lcikge1xyXG4gIC8vQ2xlYXIgdGhlIGNvbnRhaW5lclxyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAvL0NyZWF0ZSBhIG5ldyBlbGVtZW50IGZvciBlYWNoIGNlbGwgaW4gdGhlIGJvYXJkIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGNvbnRhaW5lclxyXG4gIGJvYXJkLmdldEJvYXJkKCkuZm9yRWFjaCgocm93LCBpKSA9PiB7XHJcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgaikgPT4ge1xyXG4gICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xyXG5cclxuICAgICAgLy8gQWRkIGEgJ2hpdCcgY2xhc3MgdG8gdGhlIGNlbGwgaWYgaXQncyBiZWVuIGhpdFxyXG4gICAgICBpZiAoY2VsbCAhPT0gbnVsbCAmJiBjZWxsLmdldEhpdENvdW50KCkgPiAwKSB7XHJcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGxFbGVtZW50KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==