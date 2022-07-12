import endGame from './endGame.js';
import player from './player-ai.js';

const domModule = (
    humanBoard,
    humanPlayer,
    aiBoard,
    aiPlayer,
    playerShips,
    aiShips
) => {
    const boards = document.getElementsByClassName('gameboards')[0].childNodes;
    const boardsArray = [...boards];

    const playerBoardColumns = [...boardsArray[0].children[1].children];
    const aiBoardColumns = [...boardsArray[1].children[1].children];

    const rotateButton = document.createElement('button');
    rotateButton.textContent = 'Rotate Ships';
    rotateButton.classList.add('rotate-button');

    const playerShipHolder = document.createElement('div');
    playerShipHolder.appendChild(rotateButton);
    for (let i = 0; i < playerShips.length; i++) {
        const ship = document.createElement('div');
        ship.addEventListener('dragstart', dragStart);
        ship.setAttribute('draggable', true);
        ship.classList.add('ship', 'shark-img');
        ship.setAttribute('id', `ship-${i}`);
        rotateButton.addEventListener('click', () => {
            ship.classList.toggle('shark-img');
            ship.classList.toggle('ship-rotate');
            ship.classList.toggle('shark-rotate');
        });
        for (let j = 0; j < playerShips[i].length; j++) {
            const shipTile = document.createElement('div');
            // if (j === 0) {
            //     shipTile.classList.add('border-start');
            //     ship.appendChild(shipTile);
            // } else if (j === playerShips[i].length - 1) {
            //     shipTile.classList.add('border-end');
            //     ship.appendChild(shipTile);
            // } else {
            shipTile.classList.add('border');
            ship.appendChild(shipTile);
        }
        // }
        playerShipHolder.appendChild(ship);
    }

    playerShipHolder.classList.add('ship-holder');
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
                    console.log(aiBoard);
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
                    // console.log(currentAiAttack);
                    humanBoardRefresh(currentAiAttack);
                    checkWin();
                    if (checkWin() === 'ai wins') {
                        return endGame('AI Wins!');
                    }
                });
            }
        }
    });

    function humanBoardRefresh(currentAiAttack) {
        console.log(humanBoard);
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
            console.log('ai wins');
            return 'ai wins';
        }
        if (aiBoard.allShipsSank === true) {
            console.log('player win');
            return 'player wins';
        }
    }

    // DRAG AND DROP
    // console.log(playerBoardColumns);

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            console.log('id', e.target.id);
            e.target.classList.add('hide');
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
        if (e.target.classList[0].includes('number-tile')) {
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
            // draggable = [...draggable.children];
            console.log(playerShips);
            console.log(draggable);
            console.log(e.target);
            for (let i = 0; i < playerShips.length; i++) {
                // console.log(playerShips.indexOf(playerShips[i]));
                // console.log(id.split('-')[1]);
                if (id.split('-')[1] == playerShips.indexOf(playerShips[i])) {
                    console.log(e.target.classList[1]);
                    const secondCordLetter =
                        e.target.classList[1].split('-')[0];
                    const secondCordNum = e.target.classList[1].split('-')[1];

                    const fullSecondCord = `${secondCordLetter}-${
                        parseInt(secondCordNum) + playerShips[i].length - 1
                    }`;
                    humanBoard.placeShip(
                        playerShips[i].length,
                        e.target.classList[1],
                        fullSecondCord
                    );
                    console.log(humanBoard);
                }
            }

            // humanBoard.placeShip();
        }
    }
};

export default domModule;
