export default function renderBoard(board, container) {
  //Clear the container
  container.innerHTML = "";

  //Create a new element for each cell in the board and append it to the container
  board.getBoard().forEach((row, i) => {
    row.forEach((cell, j) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.id = j;

      container.appendChild(cellElement);
    });
  });
}
