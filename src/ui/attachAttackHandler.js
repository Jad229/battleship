import renderBoard from "./renderBoard";

export default function attachAttackHandler(player, container) {
  // For each cell, add an event listener that calls the attack method when clicked
  Array.from(container.getElementsByClassName("cell")).forEach(
    (cellElement, i) => {
      const x = Math.floor(i / 10);
      const y = i % 10;
      cellElement.addEventListener("click", () => {
        player.attack([x, y]);
        // After each attack, re-render the boards to reflect the new state
        renderBoard(
          player.getGameboard(),
          document.getElementById("player-board")
        );
        renderBoard(
          player.getEnemyGameboard(),
          document.getElementById("enemy-board")
        );
      });
    }
  );
}
