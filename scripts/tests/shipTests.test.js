import shipFactory from '../shipFactory.js';

const newShip = shipFactory(4);
test('creates ship', () => {
    expect(newShip.length).toBe(4);
});

test('ship tracks hits to self', () => {
    newShip.hit('A-7');
    expect(newShip.hitLocations).toEqual(['A-7']);
});

test('ship doesnt track same hit twice', () => {
    newShip.hit('A-7');
    expect(newShip.hitLocations).toHaveLength(1);
});

test('ship is destroyed ', () => {
    const destroyMe = shipFactory(3);
    destroyMe.hit('A-1');
    destroyMe.hit('A-2');
    destroyMe.hit('A-3');
    destroyMe.destroy();
    expect(destroyMe.sunk).toBe(true);
});
