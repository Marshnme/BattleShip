import { shipFactory } from './scripts/shipFactory.js';

const newShip = shipFactory(4);
console.log(newShip);

newShip.hit(2);
newShip.hit(7);
newShip.hit(4);

console.log(newShip);
