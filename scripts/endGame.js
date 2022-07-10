const endGame = (name) => {
    const winnerMessageContainer = document.createElement('div');
    winnerMessageContainer.innerHTML = `
    <p>${name} Wins!</p>
    <button>Play Again?</button>
    `;
    winnerMessageContainer.classList.add('winner-message-container');

    const body = document.querySelector('body');

    body.replaceChildren(winnerMessageContainer);
    // body.appendChild(winnerMessageContainer);
};
export default endGame;
