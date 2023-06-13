export default function renderBoard(board, container) {
  //Clear the container
  container.innerHTML = "";

  //Create a new element for each cell in the board and append it to the container
  board.getBoard().forEach((row, i) => {
    row.forEach((cell, j) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

      // Add a 'ship' class to the cell if there's a ship
      if (cell !== null) {
        cellElement.classList.add("ship");
      }

      // Add a 'hit' class to the cell if it's been hit
      if (cell !== null && cell.getHitCount() > 0) {
        cellElement.classList.add("hit");
      }

      container.appendChild(cellElement);
    });
  });
}
