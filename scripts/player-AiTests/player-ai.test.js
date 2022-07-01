import player from '../player-ai.js';
import { gameBoardFactory } from '../gameboardFactory.js';

const boardForTester = gameBoardFactory();
boardForTester.placeShip(1, 'A-1', 'A-1');
boardForTester.placeShip(4, 'C-4', 'F-4');

const testPlayer = player('tester', boardForTester);

test('player attack is tracked', () => {
    testPlayer.attack('C-4');
    expect(testPlayer.allAttacks).toEqual(['C-4']);
});
