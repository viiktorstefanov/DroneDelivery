import { generateRandomId } from "../services/generateId.js";
import { Drone } from "./Drone.js";

export function createDrone(droneType) {
  let drone;
  const randomId = generateRandomId("drone");

  drone = new Drone(droneType.capacity, droneType.consumption,randomId);
  //add type for lasts task

  return drone;
};
