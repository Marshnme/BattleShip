import { gameBoardFactory } from './gameboardFactory.js';
import shipFactory from './shipFactory.js';
import player from './player-ai.js';

const domModule = (humanBoard, humanPlayer, aiBoard, aiPlayer) => {
    const boards = document.getElementsByClassName('gameboards')[0].childNodes;
    const boardsArray = [...boards];

    const playerBoardColumns = [...boardsArray[0].children[1].children];
    const aiBoardColumns = [...boardsArray[1].children[1].children];

    aiBoardColumns.map((tile) => {
        // console.log(tile);
        for (let i = 0; i < tile.children.length; i++) {
            if (
                tile.children[i].classList[1] !== `undefined-${i}` &&
                tile.children[i].classList[1] !== undefined
            ) {
                tile.children[i].addEventListener('click', (e) => {
                    const currentAttack = humanPlayer.attack(
                        tile.children[i].classList[1]
                    );
                    // console.log(aiBoard);
                    // console.log(humanPlayer);
                    if (
                        aiBoard.allShipCords.includes(
                            tile.children[i].classList[1]
                        )
                    ) {
                        // console.log(tile.children[i]);
                        tile.children[i].classList.add('hit-tile');
                    } else {
                        tile.children[i].classList.add('missed-tile');
                    }

                    if (currentAttack === 'attack already made') {
                        return console.log('stop ai attack');
                    }
                    const currentAiAttack = aiPlayer.aiAttack();
                    // console.log(humanBoard);
                    // console.log(humanBoard);
                    // console.log(aiBoard);
                    console.log(currentAiAttack);
                    humanBoardRefresh(currentAiAttack);
                });
            }
        }
    });

    function humanBoardRefresh(currentAiAttack) {
        playerBoardColumns.map((tile) => {
            // console.log(tile);

            for (let i = 0; i < tile.children.length; i++) {
                // console.log(tile.children[i]);
                if (
                    tile.children[i].classList[1] !== `undefined-${i}` &&
                    tile.children[i].classList[1] !== undefined
                ) {
                    // console.log(tile.children[i].classList[1]);
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
};

export default domModule;
