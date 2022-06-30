import { gameBoardFactory } from '../gameboardFactory.js';

const testBoard = gameBoardFactory();
test('places ships at correct coordinates', () => {
    testBoard.placeShip(4, 'A-1', 'D-1');
    testBoard.placeShip(2, 'A-6', 'A-7');
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

    expect(testBoard.missedShots).toEqual(['A-5', 'A-2', 'A-3', 'A-8', 'A-9']);
});

test('doesnt tracks duplicated missed shots', () => {
    testBoard.receiveAttack('A-5');
    testBoard.receiveAttack('A-5');
    testBoard.receiveAttack('A-5');
    testBoard.receiveAttack('A-5');
    testBoard.receiveAttack('A-5');

    expect(testBoard.missedShots).toEqual(['A-5', 'A-2', 'A-3', 'A-8', 'A-9']);
});

test('tracks hits of ships', () => {
    testBoard.receiveAttack('A-6');
    testBoard.receiveAttack('D-1');

    // console.log(testBoard.ships[1].ship.hitLocations);

    expect(testBoard.ships[0].ship.hitLocations).toEqual(['D-1']);
    expect(testBoard.ships[1].ship.hitLocations).toEqual(['A-6']);
});

test('tracks if ship sinks on all cords hit', () => {
    testBoard.receiveAttack('A-7');

    // console.log(testBoard.ships[1].ship.hitLocations);

    expect(testBoard.ships[1].ship.sunk).toEqual(true);
});
