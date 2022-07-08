import { gameBoardFactory } from './gameboardFactory.js';
import shipFactory from './shipFactory.js';
import player from './player-ai.js';

const domModule = (humanBoard, humanPlayer, aiBoard, aiPlayer) => {
    const boards = document.getElementsByClassName('gameboards')[0].childNodes;
    const boardsArray = [...boards];

    const playerBoardColumns = [...boardsArray[0].children[1].children];
    const aiBoardColumns = [...boardsArray[1].children[1].children];

    // playerBoardColumns.map((tile) => {
    //     // console.log(tile);
    //     for (let i = 0; i < tile.children.length; i++) {
    //         console.log(tile.children[i]);
    //         if (tile !== tile.children[0]) {
    //             tile.children[i].addEventListener('click', (e) => {
    //                 humanPlayer.attack(tile.children[i].classList[1]);
    //                 console.log(aiBoard);
    //             });
    //         }
    //     }
    // });

    aiBoardColumns.map((tile) => {
        // console.log(tile);
        for (let i = 0; i < tile.children.length; i++) {
            if (
                tile.children[i].classList[1] !== `undefined-${i}` &&
                tile.children[i].classList[1] !== undefined
            ) {
                tile.children[i].addEventListener('click', (e) => {
                    humanPlayer.attack(tile.children[i].classList[1]);
                    console.log(aiBoard);
                    if (
                        aiBoard.allShipCords.includes(
                            tile.children[i].classList[1]
                        )
                    ) {
                        console.log(tile.children[i]);
                        tile.children[i].classList.add('hit-tile');
                    } else {
                        tile.children[i].classList.add('missed-tile');
                    }
                });
            }
        }
    });
};

export default domModule;
