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

    const playerShipHolder = document.createElement('div');

    for (let i = 0; i < playerShips.length; i++) {
        const ship = document.createElement('div');
        ship.classList.add('ship');
        for (let j = 0; j < playerShips[i].length; j++) {
            const shipTile = document.createElement('div');
            shipTile.classList.add('border');
            ship.appendChild(shipTile);
        }
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
};

export default domModule;
