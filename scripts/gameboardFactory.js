import shipFactory from './shipFactory';

const gameBoardFactory = () => {
    let ships = [];

    function placeShip(cord1, cord2) {
        ships = [...ships, { ship: shipFactory(3), cord1, cord2 }];
    }
};

export default gameBoardFactory;
