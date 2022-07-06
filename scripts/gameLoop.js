import { gameBoardFactory } from './gameboardFactory.js';
import shipFactory from './shipFactory.js';
import player from './player-ai.js';

const gameLoop = () => {
    const playerBoard = gameBoardFactory();
    const aiBoard = gameBoardFactory(true);

    playerBoard.placeShip(1, 'A-1', 'A-1');
    playerBoard.placeShip(4, 'C-4', 'F-4');
    playerBoard.placeShip(3, 'H-6', 'J-6');
    playerBoard.placeShip(3, 'D-7', 'D-9');
    playerBoard.placeShip(2, 'F-9', 'F-10');

    aiBoard.placeShip(3, 'D-1', 'F-1');
    aiBoard.placeShip(1, 'A-1', 'A-1');
    aiBoard.placeShip(3, 'H-8', 'J-8');
    aiBoard.placeShip(2, 'C-9', 'C-10');
    aiBoard.placeShip(2, 'B-7', 'B-10');

    const humanPlayer = player('joshua', aiBoard);
    const aiPlayer = player('joshua', playerBoard, true);

    // while (
    //     playerBoard.allShipsDestroyed() === false &&
    //     aiBoard.allShipsDestroyed() === false
    // ) {
    //     console.log('renderr?');
    //     playerBoard.renderBoard();
    // }

    playerBoard.renderBoard();
    aiBoard.renderBoard();
};

gameLoop();
