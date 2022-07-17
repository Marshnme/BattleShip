import endGame from './endGame.js';
import player from './player-ai.js';

const domModule = (humanBoard, humanPlayer, aiBoard, aiPlayer, playerShips) => {
    const letterColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let shipPlacement = 'column';
    const boards = document.getElementsByClassName('gameboards')[0].childNodes;
    const boardsArray = [...boards];

    const playerBoardColumns = [...boardsArray[0].children[1].children];
    const aiBoardColumns = [...boardsArray[1].children[1].children];

    const buttonHolder = document.createElement('div');
    buttonHolder.classList.add('center-button');
    const rotateButton = document.createElement('button');
    rotateButton.textContent = 'Rotate Ships';
    rotateButton.classList.add('rotate-button');
    buttonHolder.appendChild(rotateButton);

    rotateButton.addEventListener('click', () => {
        if (shipPlacement === 'column') {
            shipPlacement = 'row';
        } else if (shipPlacement === 'row') {
            shipPlacement = 'column';
        }
    });

    const ships = document.createElement('div');
    ships.classList.add('player-ships');
    const playerShipHolder = document.createElement('div');
    playerShipHolder.appendChild(buttonHolder);
    playerShipHolder.classList.add('ship-holder');
    playerShipHolder.appendChild(ships);
    rotateButton.addEventListener('click', () => {
        ships.classList.toggle('ship-rotate');
    });
    for (let i = 0; i < playerShips.length; i++) {
        const ship = document.createElement('div');
        ship.addEventListener('dragstart', dragStart);
        ship.setAttribute('draggable', true);
        ship.classList.add('ship', 'shark-img');
        ship.setAttribute('id', `ship-${i}`);
        ships.appendChild(ship);
        for (let j = 0; j < playerShips[i].length; j++) {
            const shipTile = document.createElement('div');

            shipTile.classList.add('border');
            ship.appendChild(shipTile);
        }
        playerShipHolder.appendChild(ships);
    }

    console.log('BOARD ARRAY', boardsArray[0].children[1]);
    boardsArray[0].appendChild(playerShipHolder);

    aiBoardColumns.map((tile) => {
        for (let i = 0; i < tile.children.length; i++) {
            if (
                tile.children[i].classList[1] !== `undefined-${i}` &&
                tile.children[i].classList[1] !== undefined
            ) {
                tile.children[i].addEventListener('click', (e) => {
                    const currentAttack = humanPlayer.attack(
                        tile.children[i].classList[1]
                    );

                    if (
                        aiBoard.allShipCords.includes(
                            tile.children[i].classList[1]
                        )
                    ) {
                        tile.children[i].classList.add('hit-tile');
                        checkWin();
                        if (checkWin() === 'player wins') {
                            return endGame(humanPlayer.playerName);
                        }
                    } else {
                        tile.children[i].classList.add('missed-tile');
                    }

                    if (currentAttack === 'attack already made') {
                        return console.log('stop ai attack');
                    }
                    const currentAiAttack = aiPlayer.aiAttack();

                    humanBoardRefresh(currentAiAttack);
                    checkWin();
                    if (checkWin() === 'ai wins') {
                        return endGame('AI');
                    }
                });
            }
        }
    });

    function humanBoardRefresh(currentAiAttack) {
        playerBoardColumns.map((tile) => {
            for (let i = 0; i < tile.children.length; i++) {
                if (
                    tile.children[i].classList[1] !== `undefined-${i}` &&
                    tile.children[i].classList[1] !== undefined
                ) {
                    if (
                        humanBoard.allShipCords.includes(currentAiAttack) &&
                        currentAiAttack === tile.children[i].classList[1]
                    ) {
                        tile.children[i].classList.add('hit-tile');
                    } else if (
                        !humanBoard.allShipCords.includes(currentAiAttack) &&
                        currentAiAttack === tile.children[i].classList[1]
                    ) {
                        tile.children[i].classList.add('missed-tile');
                    }
                }
            }
        });
    }

    function checkWin() {
        if (humanBoard.allShipsSank === true) {
            return 'ai wins';
        }
        if (aiBoard.allShipsSank === true) {
            return 'player wins';
        }
    }

    // DRAG AND DROP

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            // e.target.classList.add('hide-ship');
        }, 0);
    }

    for (let i = 0; i < playerBoardColumns.length; i++) {
        if (i === 0) {
        } else {
            for (let j = 0; j < playerBoardColumns[i].children.length; j++) {
                playerBoardColumns[i].children[j].addEventListener(
                    'dragenter',
                    dragEnter
                );
                playerBoardColumns[i].children[j].addEventListener(
                    'dragover',
                    dragOver
                );
                playerBoardColumns[i].children[j].addEventListener(
                    'dragleave',
                    dragLeave
                );
                playerBoardColumns[i].children[j].addEventListener(
                    'drop',
                    dropEle
                );
            }
        }
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragOver(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragLeave(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');
    }

    function dropEle(e) {
        e.preventDefault();
        if (humanBoard.ships) {
            humanBoard.findAllShipCord(humanBoard.ships);
        }

        if (e.target.classList[0].includes('number-tile')) {
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);

            if (shipPlacement === 'column') {
                for (let i = 0; i < playerShips.length; i++) {
                    if (
                        id.split('-')[1] == playerShips.indexOf(playerShips[i])
                    ) {
                        const secondCordLetter =
                            e.target.classList[1].split('-')[0];
                        const secondCordNum =
                            e.target.classList[1].split('-')[1];

                        const fullSecondCord = `${secondCordLetter}-${
                            parseInt(secondCordNum) + playerShips[i].length - 1
                        }`;
                        // if cord 1 num is less than 1 or cord 2 num is greater than 10
                        // do not place ship. Add 'taken' class to grid to stop placement if already taken
                        if (
                            parseInt(e.target.classList[1].split('-')[1]) < 1 ||
                            parseInt(fullSecondCord.split('-')[1]) > 10
                        ) {
                            return;
                        }
                        if (
                            parseInt(e.target.classList[1].split('-')[1]) >=
                                1 &&
                            parseInt(fullSecondCord.split('-')[1]) <= 10
                        ) {
                            if (
                                checkIfTaken(
                                    e.target.classList[1],
                                    fullSecondCord
                                ) === 'tile taken'
                            ) {
                                return;
                            }

                            console.log('fullsecond cord', fullSecondCord);
                            humanBoard.placeShip(
                                playerShips[i].length,
                                e.target.classList[1],
                                fullSecondCord
                            );
                            draggable.classList.add('hide-ship');
                            highLightShipPlacements(
                                e.target.classList[1],
                                fullSecondCord
                            );

                            console.log(humanBoard);
                        }
                    }
                }
            } else if (shipPlacement === 'row') {
                // if cord 1 num is less than 1 or cord 2 num is greater than 10
                // do not place ship. Add 'taken' class to grid to stop placement if already taken

                // if ship spans across rows use same logic but use index of the letters

                for (let i = 0; i < playerShips.length; i++) {
                    if (
                        id.split('-')[1] == playerShips.indexOf(playerShips[i])
                    ) {
                        const secondCordLetter =
                            letterColumns.indexOf(
                                e.target.classList[1].split('-')[0]
                            ) +
                            playerShips[i].length -
                            1;
                        const secondCordNum =
                            e.target.classList[1].split('-')[1];

                        const fullSecondCord = `${letterColumns[secondCordLetter]}-${secondCordNum}`;
                        // if cord 1 num is less than 1 or cord 2 num is greater than 10
                        // do not place ship. Add 'taken' class to grid to stop placement if already taken

                        if (
                            letterColumns.indexOf(
                                e.target.classList[1].split('-')[0]
                            ) < letterColumns.indexOf('A') ||
                            fullSecondCord.split('-')[0] == 'undefined'
                        ) {
                            // draggable.classList.remove('hide-ship');
                            // e.target.classList.remove('hide-ship');
                            return;
                        }
                        if (
                            letterColumns.indexOf(
                                e.target.classList[1].split('-')[0]
                            ) >= letterColumns.indexOf('A') &&
                            letterColumns.indexOf(
                                fullSecondCord.split('-')[0]
                            ) <= letterColumns.indexOf('J')
                        ) {
                            if (
                                checkIfTaken(
                                    e.target.classList[1],
                                    fullSecondCord
                                ) === 'tile taken'
                            ) {
                                return;
                            }

                            humanBoard.placeShip(
                                playerShips[i].length,
                                e.target.classList[1],
                                fullSecondCord
                            );

                            highLightShipPlacements(
                                e.target.classList[1],
                                fullSecondCord
                            );
                            draggable.classList.add('hide-ship');

                            console.log(humanBoard);
                        }
                    }
                }
            }
        }
    }

    function checkIfTaken(cord1, cord2) {
        // loop through all cords
        if (shipPlacement === 'column') {
            for (let i = 0; i < playerBoardColumns.length; i++) {
                if (!playerBoardColumns[i].classList[1].includes('column-0')) {
                    for (
                        let j = 0;
                        j < playerBoardColumns[i].children.length;
                        j++
                    ) {
                        if (
                            playerBoardColumns[i].children[
                                j
                            ].className.includes('number-tile')
                        ) {
                            // get all tiles between both cord points
                            if (
                                playerBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[1] >=
                                    parseInt(cord1.split('-')[1]) &&
                                playerBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[1] <=
                                    parseInt(cord2.split('-')[1]) &&
                                playerBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[0] ===
                                    cord1.split('-')[0]
                            ) {
                                if (
                                    humanBoard.allShipCords.includes(
                                        playerBoardColumns[i].children[j]
                                            .classList[1]
                                    )
                                ) {
                                    return 'tile taken';
                                }
                            }
                        }
                    }
                }
            }
        } else if (shipPlacement === 'row') {
            for (let i = 0; i < playerBoardColumns.length; i++) {
                if (!playerBoardColumns[i].classList[1].includes('column-0')) {
                    for (
                        let j = 0;
                        j < playerBoardColumns[i].children.length;
                        j++
                    ) {
                        if (
                            playerBoardColumns[i].children[
                                j
                            ].className.includes('number-tile')
                        ) {
                            // get all tiles between both cord points
                            if (
                                letterColumns.indexOf(
                                    playerBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[0]
                                ) >=
                                    letterColumns.indexOf(
                                        cord1.split('-')[0]
                                    ) &&
                                letterColumns.indexOf(
                                    playerBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[0]
                                ) <=
                                    letterColumns.indexOf(
                                        cord2.split('-')[0]
                                    ) &&
                                playerBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[1] ===
                                    cord1.split('-')[1]
                            ) {
                                if (
                                    humanBoard.allShipCords.includes(
                                        playerBoardColumns[i].children[j]
                                            .classList[1]
                                    )
                                ) {
                                    return 'tile taken';
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function highLightShipPlacements(cord1, cord2) {
        // loop through all cords
        if (shipPlacement === 'column') {
            for (let i = 0; i < playerBoardColumns.length; i++) {
                if (!playerBoardColumns[i].classList[1].includes('column-0')) {
                    for (
                        let j = 0;
                        j < playerBoardColumns[i].children.length;
                        j++
                    ) {
                        if (
                            playerBoardColumns[i].children[
                                j
                            ].className.includes('number-tile')
                        ) {
                            // get all tiles between both cord points
                            if (
                                playerBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[1] >=
                                    parseInt(cord1.split('-')[1]) &&
                                playerBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[1] <=
                                    parseInt(cord2.split('-')[1]) &&
                                playerBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[0] ===
                                    cord1.split('-')[0]
                            ) {
                                console.log(
                                    'hightlight',
                                    playerBoardColumns[i].children[j]
                                );
                                playerBoardColumns[i].children[j].classList.add(
                                    'highlight'
                                );
                            }
                        }
                    }
                }
            }
        } else if (shipPlacement === 'row') {
            for (let i = 0; i < playerBoardColumns.length; i++) {
                if (!playerBoardColumns[i].classList[1].includes('column-0')) {
                    for (
                        let j = 0;
                        j < playerBoardColumns[i].children.length;
                        j++
                    ) {
                        if (
                            playerBoardColumns[i].children[
                                j
                            ].className.includes('number-tile')
                        ) {
                            // get all tiles between both cord points
                            if (
                                letterColumns.indexOf(
                                    playerBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[0]
                                ) >=
                                    letterColumns.indexOf(
                                        cord1.split('-')[0]
                                    ) &&
                                letterColumns.indexOf(
                                    playerBoardColumns[i].children[
                                        j
                                    ].classList[1].split('-')[0]
                                ) <=
                                    letterColumns.indexOf(
                                        cord2.split('-')[0]
                                    ) &&
                                playerBoardColumns[i].children[
                                    j
                                ].classList[1].split('-')[1] ===
                                    cord1.split('-')[1]
                            ) {
                                playerBoardColumns[i].children[j].classList.add(
                                    'highlight'
                                );
                            }
                        }
                    }
                }
            }
        }

        console.log(playerBoardColumns);
    }
};

export default domModule;
