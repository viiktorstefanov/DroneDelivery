import { generateRandomId } from "../services/generateId.js";
import { ChargingStation } from "./ChargingStation.js";

export function createChargingStations(stationTypes) {

  const randomId = generateRandomId("station");

  const stations = stationTypes.map((stationType) => {
    return new ChargingStation(stationType.x, stationType.y, stationType.type, randomId);
  });

  return stations;
};
