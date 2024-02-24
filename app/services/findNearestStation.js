import { calculateDistance } from "./calculateDistance.js";

export function findNearestStation(droneX, droneY, stations) {
    let nearestStation = stations[0];

    let minDistance = calculateDistance(droneX, droneY, stations[0].coordinates.x, stations[0].coordinates.y);

    for (let i = 1; i < stations.length; i++) {
        const distance = calculateDistance(droneX, droneY, stations[i].coordinates.x, stations[i].coordinates.y);
        if (distance < minDistance) {
            minDistance = distance;
            nearestStation = stations[i];
        }
    }

    return nearestStation;
}