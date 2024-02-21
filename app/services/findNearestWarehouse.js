import { calculateDistance } from "./calculateDistance.js";

export function findNearestWarehouse(customer, warehouses) {
    let nearestWarehouse = warehouses[0];

    let minDistance = calculateDistance(customer.coordinates.x, customer.coordinates.y, warehouses[0].coordinates.x, warehouses[0].coordinates.y);

    for (let i = 1; i < warehouses.length; i++) {
        const distance = calculateDistance(customer.coordinates.x, customer.coordinates.y, warehouses[i].coordinates.x, warehouses[i].coordinates.y);
        if (distance < minDistance) {
            minDistance = distance;
            nearestWarehouse = warehouses[i];
        }
    }

    return nearestWarehouse;
}