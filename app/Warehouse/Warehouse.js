export class Warehouse {
    constructor(x, y, name) {
        this.coordinates = {
            x,
            y
        };
        this.name = name;
        this.drones = [];
    };
};