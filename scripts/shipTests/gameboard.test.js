import { gameBoardFactory } from '../gameboardFactory.js';

const testBoard = gameBoardFactory();
test('places ships at correct coordinates', () => {
    testBoard.placeShip(4, 'A-1', 'D-1');
    testBoard.placeShip(1, 'A-6', 'A-7');
    expect(testBoard.ships).toMatchObject([
        {
            cord1: 'A-1',
            cord2: 'D-1',
        },

        {
            cord1: 'A-6',
            cord2: 'A-7',
        },
    ]);
});

test('tracks missed shots', () => {
    testBoard.receiveAttack('A-5');
    testBoard.receiveAttack('A-2');
    testBoard.receiveAttack('A-3');
    testBoard.receiveAttack('A-8');
    testBoard.receiveAttack('A-9');

    expect(testBoard.missedShots).toContain('A-5', 'A-1', 'A-3', 'A-8', 'A-9');
});
