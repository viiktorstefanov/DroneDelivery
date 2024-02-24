import { generateRandomId } from "../services/generateId.js";
import { Drone } from "./Drone.js";

export function createDrone(droneType) {
  let drone;
  let type = false;
  const randomId = generateRandomId("drone");

  if(droneType.type){
    type = droneType.type;
  };

  if(type) {
    drone = new Drone(droneType.capacity, droneType.consumption,randomId, type);
  } else {
    drone = new Drone(droneType.capacity, droneType.consumption,randomId);
  }

  return drone;
};
