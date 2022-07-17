import gameLoop from './gameLoop.js';

const endGame = (name) => {
    const winnerMessageContainer = document.createElement('div');
    winnerMessageContainer.innerHTML = `
    <p>${name} Wins!</p>
    `;
    const restart = document.createElement('button');
    restart.textContent = 'Play Again?';
    winnerMessageContainer.classList.add('winner-message-container');
    winnerMessageContainer.appendChild(restart);
    const body = document.querySelector('body');
    const boards = document.createElement('div');
    boards.classList.add('gameboards');
    restart.addEventListener('click', () => {
        body.replaceChildren();
        body.appendChild(boards);
        gameLoop();
    });
    console.log(restart);
    body.replaceChildren(winnerMessageContainer);
    // body.appendChild(winnerMessageContainer);
};
export default endGame;
