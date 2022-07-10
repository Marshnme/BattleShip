const shipFactory = (length) => {
    const hitLocations = [];
    const sunk = false;

    function hit(num) {
        if (this.hitLocations.includes(num)) {
            return console.log('already hit');
        }
        if (this.hitLocations.length < this.length) {
            console.log('added to hits');
            return this.hitLocations.push(num);
        }
        return console.log('You missed');
    }

    function destroy() {
        if (this.hitLocations.length === this.length) {
            this.sunk = true;
        }
    }

    return { length, hitLocations, sunk, hit, destroy };
};

export default shipFactory;
