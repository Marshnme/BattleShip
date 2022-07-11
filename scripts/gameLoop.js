import { gameBoardFactory } from './gameboardFactory.js';
import shipFactory from './shipFactory.js';
import player from './player-ai.js';
import domModule from './domModule.js';

const gameLoop = () => {
    const playerBoard = gameBoardFactory();
    const aiBoard = gameBoardFactory(true);

    const shipOne = shipFactory(2);
    const shipTwo = shipFactory(3);
    const shipThree = shipFactory(4);
    const shipFour = shipFactory(4);
    const shipFive = shipFactory(3);
    const shipSix = shipFactory(2);
    const shipSeven = shipFactory(2);
    const shipEight = shipFactory(2);
    const shipNine = shipFactory(3);
    const shipTen = shipFactory(6);

    const playerShips = [
        shipOne,
        shipTwo,
        shipThree,
        shipFour,
        shipFive,
        shipSix,
        shipSeven,
        shipEight,
        shipNine,
        shipTen,
    ];

    const aiShipOne = shipFactory(2);
    const aiShipTwo = shipFactory(3);
    const aiShipThree = shipFactory(4);
    const aiShipFour = shipFactory(4);
    const aiShipFive = shipFactory(3);
    const aiShipSix = shipFactory(2);
    const aiShipSeven = shipFactory(2);
    const aiShipEight = shipFactory(2);
    const aiShipNine = shipFactory(3);
    const aiShipTen = shipFactory(6);

    const aiShips = [
        aiShipOne,
        aiShipTwo,
        aiShipThree,
        aiShipFour,
        aiShipFive,
        aiShipSix,
        aiShipSeven,
        aiShipEight,
        aiShipNine,
        aiShipTen,
    ];

    // playerBoard.placeShip(1, 'A-1', 'A-1');
    // playerBoard.placeShip(4, 'C-4', 'F-4');
    // playerBoard.placeShip(3, 'H-6', 'J-6');
    // playerBoard.placeShip(3, 'D-7', 'D-9');
    // playerBoard.placeShip(2, 'F-9', 'F-10');

    // aiBoard.placeShip(3, 'D-1', 'F-1');
    // aiBoard.placeShip(1, 'A-1', 'A-1');
    // aiBoard.placeShip(3, 'H-8', 'J-8');
    // aiBoard.placeShip(2, 'C-9', 'C-10');
    // aiBoard.placeShip(4, 'B-7', 'B-10');

    const humanPlayer = player('Joshua', aiBoard);
    const aiPlayer = player('ai', playerBoard, true);

    playerBoard.renderBoard(humanPlayer.playerName);
    aiBoard.renderBoard();
    domModule(
        playerBoard,
        humanPlayer,
        aiBoard,
        aiPlayer,
        playerShips,
        aiShips
    );
};

gameLoop();
