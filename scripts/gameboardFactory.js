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
            if (ship.cord1.split('-')[0] === ship.cord2.split('-')[0]) {
                if (cord1.split('-')[0] === ship.cord1.split('-')[0]) {
                    for (let i = 1; i <= ship.cord2.split('-')[1]; i++) {
                        if (cord1 === `${ship.cord1.split('-')[0]}-${[i]}`) {
                            ship.ship.hit(i);
                        }
                        if (
                            cord1.split('-')[1] < ship.cord1.split('-')[1] ||
                            cord1.split('-')[1] > ship.cord2.split('-')[1]
                        ) {
                            missedShot(cord1);
                        }
                    }
                }
            }
        });
    }

    return { placeShip, receiveAttack, missedShots };
};

export { gameBoardFactory };
