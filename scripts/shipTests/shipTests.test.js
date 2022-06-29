import shipFactory from '../shipFactory';

const newShip = shipFactory(4);
test('creates ship', () => {
    expect(newShip.length).toBe(4);
});

test('ship tracks hits to self', () => {
    newShip.hit(2);
    expect(newShip.hitLocations).toContain(2);
});

test('ship doesnt track hit if larger than length', () => {
    newShip.hit(27);
    expect(newShip.hitLocations).not.toContain(27);
});

test('ship doesnt track hit if smaller than length', () => {
    newShip.hit(-1);
    newShip.hit(0);
    expect(newShip.hitLocations).not.toContain(-1);
    expect(newShip.hitLocations).not.toContain(0);
});

test('ship doesnt track same hit twice', () => {
    newShip.hit(2);
    expect(newShip.hitLocations).toHaveLength(1);
});

test('ship is destroyed ', () => {
    const destroyMe = shipFactory(3);
    destroyMe.hit(1);
    destroyMe.hit(2);
    destroyMe.hit(3);
    destroyMe.destroy();
    expect(destroyMe.sunk).toBe(true);
});
