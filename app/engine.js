import { createMapCoverage } from "./MapCoverage/createMapCoverage.service.js";
import { createWarehouses } from "./Warehouse/createWarehouse.service.js";
import { createCustomers } from "./Customer/createCustomers.service.js";
import { createDrones } from "./Drone/createDrones.services.js";
import { createOrders } from "./Order/createOrders.service.js";
import { calculateTotalTimeAndDrones } from "./services/calculateTotalTimeAndDrones.js";

export function engine(input) {
  let error;
  let drones = undefined;

  try {
    const mapCoverage = createMapCoverage(input["map-top-right-coordinate"]);

    const warehouses = createWarehouses(input.warehouses);

    const orders = createOrders(input.orders);

    const customers = createCustomers(input.customers, mapCoverage, orders);

    if(input.typesOfDrones) {
      drones = createDrones(input.typesOfDrones);
    }

    const { totalTime, dronesCount } = calculateTotalTimeAndDrones(warehouses, customers, drones, orders);

    return { totalTime, dronesCount, drones };

  } catch (e) {
    error = e.message;
    console.log(e);
  }
};
