const player = (playerName, boardToAttack, ai = false) => {
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const allAttacks = [];

    function attack(cord) {
        // console.log(this);
        if (this.allAttacks.includes(cord)) {
            console.log('attack already made');
            return 'attack already made';
        }
        boardToAttack.receiveAttack(cord);
        this.allAttacks.push(cord);
    }

    function aiAttack() {
        const randomLetter =
            columns[Math.floor(Math.random() * columns.length)];

        const randomNumber = rows[Math.floor(Math.random() * rows.length)];

        const cord = `${randomLetter}-${randomNumber}`;

        console.log('ai attack', cord);

        if (this.allAttacks.includes(cord)) {
            console.log('attack already made');
            return this.aiAttack();
        }
        boardToAttack.receiveAttack(cord);
        this.allAttacks.push(cord);
        return cord;
    }
    return { playerName, attack, aiAttack, allAttacks };
};

export default player;
