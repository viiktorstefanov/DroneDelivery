import { createMapCoverage } from "./MapCoverage/createMapCoverage.service.js";
import { createWarehouses } from "./Warehouse/createWarehouse.service.js";
import { createCustomers } from "./Customer/createCustomers.service.js";
import { createOrders } from "./Order/createOrders.service.js";
import { generateTemplate } from "./services/generateTemplate.js";
import { simulate } from "./services/simulate.js";
import { generateOutput } from "./services/generateOutput.js";
import { generateErrorTemplate } from "./services/generateErrorTemplate.js";
import { showAnimatedDrone } from "./services/animatedDrone.js";
import { clearPreviousResult } from "./services/clearPreviousResult.js";
import { generateNotification } from "./services/generateNotification.js";
import { createChargingStations } from "./chargingStation/createChargingStations.js";
import { getRealTimePerProgramMinute } from "./services/programTimeConverter.js";

export async function engine() {
  showAnimatedDrone();
  let getInput = localStorage.getItem("input");
  let input = JSON.parse(getInput);

  const newOrders = localStorage.getItem("newOrders");

  if (newOrders) {
    input = JSON.parse(newOrders);
  }

  let warehouses = {};
  let outputEnabled = input.output && input.output.poweredOn;
  let programMinutes = 0;
  let realMilliseconds = 0;
  let biggestDistance = 0;
  let dronesTypesUsed = {};
  let orderStatus = false;
  let frequency = 0;
  let chargingStations = {};

  if (input.deliveryStatus && input.deliveryStatus.output) {
    orderStatus = true;
    frequency = input.deliveryStatus.frequency;
  }

  let realPerProgram = 0;

  if (outputEnabled) {
    programMinutes = input.output.minutes.program;
    realMilliseconds = input.output.minutes.real;
    realPerProgram = getRealTimePerProgramMinute(
      programMinutes,
      realMilliseconds
    );
  }

  try {
    generateNotification();

    const mapCoverage = createMapCoverage(input["map-top-right-coordinate"]);

    if (input.chargingStations) {
      chargingStations = createChargingStations(input.chargingStations);
    }

    if (input.products) {
      warehouses = createWarehouses(input.warehouses, input.products);
    } else {
      warehouses = createWarehouses(input.warehouses);
    }

    const orders = createOrders(input.orders, input.customers);

    const customers = createCustomers(input.customers, mapCoverage, orders);

    const result = await simulate(
      warehouses,
      customers,
      orders,
      input.typesOfDrones,
      realPerProgram,
      outputEnabled,
      orderStatus,
      frequency,
      chargingStations
    );

    biggestDistance = result.biggestDistance;
    dronesTypesUsed = result.dronesTypesUsed;

    const output = generateOutput(
      dronesTypesUsed,
      biggestDistance,
      orders.length
    );
    generateTemplate(output);
  } catch (e) {
    clearPreviousResult();
    generateErrorTemplate(e.message);
    return;
  }
}
