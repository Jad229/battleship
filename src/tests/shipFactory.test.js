import { default as ShipFactory, default as shipFactory } from "../shipFactory";

test("One Hit", () => {
  const ship = ShipFactory(4);
  let hitCount = 0;

  hitCount = ship.hit();
  expect(hitCount).toBe(1);
});

test("Multiple Hits", () => {
  const ship = ShipFactory(4);
  let hitCount = 0;

  hitCount = ship.hit();
  hitCount = ship.hit();
  hitCount = ship.hit();
  expect(hitCount).toBe(3);
});

test("Sink Ship", () => {
  const ship = shipFactory(1);
  let isSunk = false;

  ship.hit();
  isSunk = ship.isSunk();

  expect(isSunk).toBe(true);
});
