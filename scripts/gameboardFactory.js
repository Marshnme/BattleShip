import shipFactory from './shipFactory.js';

const gameBoardFactory = (ai = false) => {
    const letterColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const numberRows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const missedShots = [];
    const allShipCords = [];
    const allShipsSank = false;

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
        if (this.missedShots.includes(cord1)) {
            return;
        }
        this.missedShots.push(cord1);
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
                        ship.ship.destroy();
                    }
                    if (!allShipCords.includes(cord1)) {
                        missedShot(cord1);
                    }
                }
            }
            // row ship hit detection
            if (shipCord1SecondValue === shipCord2SecondValue) {
                for (
                    let i = letterColumns.indexOf(shipCord1FirstValue);
                    i <= letterColumns.indexOf(shipCord2FirstValue);
                    i++
                ) {
                    if (
                        cord1 === `${letterColumns[i]}-${shipCord1SecondValue}`
                    ) {
                        ship.ship.hit(cord1);
                        ship.ship.destroy();
                    }
                    if (!allShipCords.includes(cord1)) {
                        missedShot(cord1);
                    }
                }
            }
        });
    }

    function allShipsDestroyed() {
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].ship.sunk === false) {
                this.allShipsSank = false;
                return false;
            }
            if (this.ships[i].ship.sunk === true) {
                this.allShipsSank = true;
                return true;
            }
        }
        console.log(this.allShipsSank);
    }

    function renderBoard() {
        const gameboardParent = document.querySelector('.gameboards');
        const boardTitle = document.createElement('h2');
        boardTitle.classList.add('board-title');
        boardTitle.textContent = `${ai ? 'AI Board' : 'Player Board'}`;
        const boardHolder = document.createElement('div');
        boardHolder.classList.add('board-holder');
        const board = document.createElement('div');
        board.classList.add('board');
        for (let i = 0; i < letterColumns.length + 1; i++) {
            const column = document.createElement('div');
            column.classList.add('column', `column-${i}`);
            const letterTile = document.createElement('div');
            letterTile.classList.add(`letter-tile-${i}`);
            letterTile.textContent = `${
                letterColumns[i - 1] ? letterColumns[i - 1] : 'n'
            }`;
            column.prepend(letterTile);
            gameboardParent.appendChild(boardHolder);
            for (let j = 0; j < numberRows.length; j++) {
                const numberTiles = document.createElement('div');
                numberTiles.textContent = `${
                    letterColumns[i - 1] === undefined ? numberRows[j] : ''
                }`;
                numberTiles.classList.add(
                    'number-tile',
                    `${letterColumns[i - 1]}-${numberRows[j]}`
                );
                column.appendChild(numberTiles);
                board.appendChild(column);
                boardHolder.appendChild(board);
            }
            boardHolder.prepend(boardTitle);
            gameboardParent.appendChild(boardHolder);
        }
    }

    return {
        placeShip,
        receiveAttack,
        missedShots,
        allShipsDestroyed,
        allShipsSank,
        renderBoard,
    };
};

export { gameBoardFactory };
