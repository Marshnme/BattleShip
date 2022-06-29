const shipFactory = (length) => {
    const hitLocations = [];
    const sunk = false;

    function hit(num) {
        if (hitLocations.includes(num)) {
            return 'already hit';
        }
        if (num <= length && num > 0) {
            this.hitLocations.push(num);
        } else {
            return 'You missed';
        }
    }

    function destroy() {
        if (this.hitLocations.length === this.length) {
            this.sunk = true;
        }
    }

    return { length, hitLocations, sunk, hit, destroy };
};

export default shipFactory;
