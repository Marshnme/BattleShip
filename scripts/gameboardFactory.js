import shipFactory from './shipFactory.js';

const gameBoardFactory = () => {
    const missedShots = [];

    function placeShip(length, cord1, cord2) {
        if (!this.ships) {
            this.ships = [{ ship: shipFactory(length), cord1, cord2 }];
        } else if (this.ships) {
            this.ships = [
                ...this.ships,
                { ship: shipFactory(length), cord1, cord2 },
            ];
        }
    }

    function missedShot(cord1) {
        if (missedShots.includes(cord1)) {
            return;
        }
        missedShots.push(cord1);
    }
    function receiveAttack(cord1) {
        const updatedShips = this.ships.map((ship) => {
            // column ships hit detection
            const shipCord1FirstValue = ship.cord1.split('-')[0];
            const shipCord1SecondValue = ship.cord1.split('-')[1];
            const shipCord2FirstValue = ship.cord2.split('-')[0];
            const shipCord2SecondValue = ship.cord2.split('-')[1];
            const attackCordFirstValue = cord1.split('-')[0];

            if (shipCord1FirstValue === shipCord2FirstValue) {
                if (attackCordFirstValue === shipCord1FirstValue) {
                    for (let i = 1; i <= shipCord2SecondValue; i++) {
                        if (cord1 === `${shipCord1FirstValue}-${[i]}`) {
                            ship.ship.hit(i);
                        }
                        if (
                            cord1.split('-')[1] < shipCord1SecondValue ||
                            cord1.split('-')[1] > shipCord2SecondValue
                        ) {
                            missedShot(cord1);
                        }
                    }
                }
            }
            // row ship hit detection
        });
    }

    return { placeShip, receiveAttack, missedShots };
};

export { gameBoardFactory };
