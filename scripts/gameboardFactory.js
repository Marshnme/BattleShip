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

    // CHECK IF TILE IS TAKEN BY ADDING CLASS TO PLACED TILES
    function placeAiShip(length) {
        const boards =
            document.getElementsByClassName('gameboards')[0].childNodes;
        const boardsArray = [...boards];
        const aiBoardColumns = [...boardsArray[1].children[1].children];

        const randomLetter =
            letterColumns[Math.floor(Math.random() * letterColumns.length)];

        const randomNumber =
            numberRows[Math.floor(Math.random() * numberRows.length)];

        let randomLetterCord2 = null;
        let randomNumCord2 = null;
        const fiftyFifty = Math.floor(Math.random() * 2);

        if (fiftyFifty === 0 || fiftyFifty === 1) {
            if (fiftyFifty === 0) {
                randomLetterCord2 =
                    letterColumns[
                        letterColumns.indexOf(randomLetter) + parseInt(length)
                    ];
            } else {
                randomNumCord2 = parseInt(randomNumber) + parseInt(length);
            }
        }

        const cord1 = `${randomLetter}-${randomNumber}`;
        const cord2 = `${fiftyFifty === 0 ? randomLetterCord2 : randomLetter}-${
            fiftyFifty === 1 ? randomNumCord2 : randomNumber
        }`;

        if (randomNumCord2 > 10 || randomLetterCord2 === undefined) {
            return this.placeAiShip(length);
        }
        console.log(cord1, cord2);

        for (let i = 0; i < aiBoardColumns.length; i++) {
            if (!aiBoardColumns[i].classList[1].includes('column-0')) {
                for (let j = 0; j < aiBoardColumns[i].children.length; j++) {
                    if (
                        aiBoardColumns[i].children[j].classList[0] ===
                        'number-tile'
                    ) {
                        // console.log(aiBoardColumns[i].children[j]);
                        if (cord1.split('-')[0] === cord2.split('-')[0]) {
                            // columns
                            if (
                                parseInt(
                                    aiBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[1]
                                ) >= parseInt(cord1.split('-')[1]) &&
                                parseInt(
                                    aiBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[1]
                                ) <= parseInt(cord2.split('-')[1]) &&
                                aiBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[0] ===
                                    cord1.split('-')[0]
                            ) {
                                console.log(aiBoardColumns[i].children[j]);
                            }

                            // loop through tiles between cord1 and cord2
                            // if any of the tiles have 'taken' class rerun placeship
                        } else if (
                            cord1.split('-')[1] === cord2.split('-')[1]
                        ) {
                            // rows
                            if (
                                letterColumns.indexOf(
                                    aiBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[0]
                                ) >=
                                    letterColumns.indexOf(
                                        cord1.split('-')[0]
                                    ) &&
                                letterColumns.indexOf(
                                    aiBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[0]
                                ) <=
                                    letterColumns.indexOf(
                                        cord2.split('-')[0]
                                    ) &&
                                parseInt(
                                    aiBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[1]
                                ) === parseInt(cord1.split('-')[1])
                            ) {
                                console.log(aiBoardColumns[i].children[j]);
                            }
                            // loop through tiles between cord1 and cord2
                            // if any of the tiles have 'taken' class rerun placeship
                        }
                    }
                }
            }
        }

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
        if (!missedShots.includes(cord1)) {
            missedShots.push(cord1);
            return console.log('missed shot');
        }
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
                    let i = numberRows.indexOf(shipCord1SecondValue);
                    i <= numberRows.indexOf(shipCord2SecondValue);
                    i++
                ) {
                    if (
                        allShipCords.includes(
                            `${shipCord1FirstValue}-${numberRows[i]}`
                        )
                    ) {
                        return;
                    }

                    allShipCords.push(
                        `${shipCord1FirstValue}-${numberRows[i]}`
                    );
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
                    let i = numberRows.indexOf(shipCord1SecondValue);
                    i <= numberRows.indexOf(shipCord2SecondValue);
                    i++
                ) {
                    if (cord1 === `${shipCord1FirstValue}-${numberRows[i]}`) {
                        ship.ship.hit(cord1);
                        ship.ship.destroy();
                        this.allShipsDestroyed();
                    }
                    if (!allShipCords.includes(cord1)) {
                        missedShot(cord1);
                    }
                }
                return;
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
                        this.allShipsDestroyed();
                    }
                    if (!allShipCords.includes(cord1)) {
                        missedShot(cord1);
                    }
                }
            }
        });
    }

    function allShipsDestroyed() {
        for (let i = 0; i <= this.ships.length - 1; i++) {
            console.log('index', i);
            console.log(this.ships);
            if (this.ships[i].ship.sunk === false) {
                this.allShipsSank = false;
                return false;
            }
            if (this.ships[i].ship.sunk === true) {
                this.allShipsSank = true;
            }
        }
    }

    function renderBoard(humanName) {
        const gameboardParent = document.querySelector('.gameboards');
        const boardTitle = document.createElement('h2');
        boardTitle.classList.add('board-title');
        boardTitle.textContent = `${
            ai ? "AI's Board" : `${humanName}'s Board`
        }`;
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
        placeAiShip,
        receiveAttack,
        missedShots,
        allShipsDestroyed,
        allShipsSank,
        allShipCords,
        renderBoard,
    };
};

export { gameBoardFactory };
