import shipFactory from './scripts/shipFactory.js';
import { gameBoardFactory } from './scripts/gameboardFactory.js';

// const newShip = shipFactory(4);
// console.log(newShip);

// newShip.hit(2);
// newShip.hit(7);
// newShip.hit(4);

// console.log(newShip);

const firstBoard = gameBoardFactory();
firstBoard.placeShip(4, 'A-1', 'D-1');
firstBoard.placeShip(2, 'A-6', 'A-7');

console.log(firstBoard);

firstBoard.receiveAttack('A-2');
firstBoard.receiveAttack('A-3');
firstBoard.receiveAttack('A-4');
console.log('break');
firstBoard.receiveAttack('B-1');
firstBoard.receiveAttack('B-2');
firstBoard.receiveAttack('B-3');
console.log('break');
firstBoard.receiveAttack('B-9');
firstBoard.receiveAttack('B-4');
console.log('break');
firstBoard.receiveAttack('A-1');
firstBoard.receiveAttack('D-1');
firstBoard.receiveAttack('C-1');
firstBoard.receiveAttack('A-6');
firstBoard.receiveAttack('A-7');

console.log(firstBoard);
