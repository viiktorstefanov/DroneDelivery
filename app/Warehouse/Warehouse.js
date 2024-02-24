export class Warehouse {
    constructor(x, y, name, products) {
        this.coordinates = {
            x,
            y
        };
        this.name = name;
        this.drones = [];
        this.products = products || [];
    };
};