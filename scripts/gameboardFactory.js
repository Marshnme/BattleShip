import shipFactory from './shipFactory.js';

const gameBoardFactory = () => {
    const letterColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const missedShots = [];
    const allShipCords = [];

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

    function findAllShipCord(allShips) {
        const newAllShipCords = allShips.map((ship) => {
            // column ships cord detection
            const shipCord1FirstValue = ship.cord1.split('-')[0];
            const shipCord1SecondValue = ship.cord1.split('-')[1];
            const shipCord2FirstValue = ship.cord2.split('-')[0];
            const shipCord2SecondValue = ship.cord2.split('-')[1];

            if (shipCord1FirstValue === shipCord2FirstValue) {
                for (
                    let i = shipCord1SecondValue;
                    i <= shipCord2SecondValue;
                    i++
                ) {
                    if (
                        allShipCords.includes(`${shipCord1FirstValue}-${[i]}`)
                    ) {
                        return;
                    }

                    allShipCords.push(`${shipCord1FirstValue}-${[i]}`);
                }
            }
            // row ship cord detection
            // if second values are the same (numbers b-1 d-1)
            if (shipCord1SecondValue === shipCord2SecondValue) {
                // loop through array of letters,finding indexOf
                for (
                    let i = letterColumns.indexOf(shipCord1FirstValue);
                    i <= letterColumns.indexOf(shipCord2FirstValue);
                    i++
                ) {
                    if (
                        allShipCords.includes(
                            `${letterColumns[i]}-${shipCord1SecondValue}`
                        )
                    ) {
                        return;
                    }
                    allShipCords.push(
                        `${letterColumns[i]}-${shipCord1SecondValue}`
                    );
                }
            }
        });
    }

    function receiveAttack(cord1) {
        findAllShipCord(this.ships);

        const updatedShips = this.ships.map((ship) => {
            // column ships hit detection
            const shipCord1FirstValue = ship.cord1.split('-')[0];
            const shipCord1SecondValue = ship.cord1.split('-')[1];
            const shipCord2FirstValue = ship.cord2.split('-')[0];
            const shipCord2SecondValue = ship.cord2.split('-')[1];

            if (shipCord1FirstValue === shipCord2FirstValue) {
                for (
                    let i = shipCord1SecondValue;
                    i <= shipCord2SecondValue;
                    i++
                ) {
                    if (cord1 === `${shipCord1FirstValue}-${[i]}`) {
                        ship.ship.hit(cord1);
                    }
                    if (!allShipCords.includes(cord1)) {
                        missedShot(cord1);
                    }
                }
            }
            // row ship hit detection
            // if second values are the same (numbers b-1 d-1)
            if (shipCord1SecondValue === shipCord2SecondValue) {
                // loop through array of letters,finding indexOf
                for (
                    let i = letterColumns.indexOf(shipCord1FirstValue);
                    i <= letterColumns.indexOf(shipCord2FirstValue);
                    i++
                ) {
                    if (
                        cord1 === `${letterColumns[i]}-${shipCord1SecondValue}`
                    ) {
                        ship.ship.hit(cord1);
                    }
                    if (!allShipCords.includes(cord1)) {
                        missedShot(cord1);
                    }
                }
            }
        });
    }

    return { placeShip, receiveAttack, missedShots };
};

export { gameBoardFactory };
