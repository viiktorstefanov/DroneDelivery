import { Drone } from "./Drone.js";

function parseAndConvertCapacity(capacity) {
    const capacityNumber = parseInt(capacity);
    if (capacity.includes("kW")) {
        return capacityNumber * 1000;
    }
    return capacityNumber;
}

export function createDrones(inputDrones) {
    const currentDrones = inputDrones.map(drone => new Drone(parseAndConvertCapacity(drone.capacity), parseInt(drone.consumption)));

    return currentDrones;
};


