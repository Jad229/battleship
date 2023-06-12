import { default as ShipFactory, default as shipFactory } from "../shipFactory";

test("Should hit ship once", () => {
  const ship = ShipFactory(4);
  let hitCount = 0;

  hitCount = ship.hit();
  expect(hitCount).toBe(1);
});

test("Should hit ship 3 times", () => {
  const ship = ShipFactory(4);
  let hitCount = 0;

  hitCount = ship.hit();
  hitCount = ship.hit();
  hitCount = ship.hit();
  expect(hitCount).toBe(3);
});

test("Should consider a ship of length 1 as sunk after one hit", () => {
  const ship = shipFactory(1);
  let isSunk = false;

  ship.hit();
  isSunk = ship.isSunk();

  expect(isSunk).toBe(true);
});

test("Should not consider a ship of length 4 as sunk after one hit", () => {
  const ship = shipFactory(4);
  let isSunk = false;

  ship.hit();
  isSunk = ship.isSunk();

  expect(isSunk).toBe(false);
});

test("Should not consider a ship of length 4 as sunk after 3 hits", () => {
  const ship = shipFactory(4);
  let isSunk = false;

  ship.hit();
  isSunk = ship.isSunk();
  ship.hit();
  isSunk = ship.isSunk();
  ship.hit();
  isSunk = ship.isSunk();

  expect(isSunk).toBe(false);
});
