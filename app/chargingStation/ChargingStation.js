export class ChargingStation {
    constructor(x, y, type, id) {
        this.coordinates = {
            x,
            y
        };
        this.type = type;
        this.id = id;
    };
};