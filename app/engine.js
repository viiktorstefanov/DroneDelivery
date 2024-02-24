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

export async function engine() {
  showAnimatedDrone();
  let getInput = localStorage.getItem('input');
  let input = JSON.parse(getInput);

  const newOrders = localStorage.getItem('newOrders');

  if(newOrders) {
    input = JSON.parse(newOrders);
  }

  let warehouses = {};
  let outputEnabled = false;
  let programMinutes = 0;
  let realMilliseconds = 0;
  let biggestDistance = 0;
  let dronesTypesUsed = {};
  let orderStatus = false;
  let frequency = 0; 
  let chargingStations = {};

  if(input.output) {
    outputEnabled = input.output.poweredOn;
    programMinutes = input.output.minutes.program;
    realMilliseconds = input.output.minutes.real;
  };

  if(input.deliveryStatus && input.deliveryStatus.output) {
    orderStatus = true;
    frequency = input.deliveryStatus.frequency;
  };

  try {
    
    generateNotification();

    const mapCoverage = createMapCoverage(input["map-top-right-coordinate"]);

    if(input.chargingStations) {
      chargingStations = createChargingStations(input.chargingStations);
    };

    if(input.products) {
      warehouses = createWarehouses(input.warehouses, input.products);
    } else {
      warehouses = createWarehouses(input.warehouses);
    };

    const orders = createOrders(input.orders);

    const customers = createCustomers(input.customers, mapCoverage, orders);

    // if(outputEnabled) {
    //   const result = document.getElementById('result');
    //   const simulatedMinutes = document.createElement('p');
    //   simulatedMinutes.style.marginTop = '1rem';

    //   const programMinutes = input.output.minutes.program;
    //   const realMilliseconds = input.output.minutes.real;
    //   const realMillisecondsPerProgramMinute = realMilliseconds / programMinutes;
    //   for (let minute = 1; minute <= programMinutes; minute++) {
    //     await new Promise(resolve => setTimeout(resolve, realMillisecondsPerProgramMinute));
    //     simulatedMinutes.textContent = `Program minutes: ${minute}`;
    //     result.appendChild(simulatedMinutes);
    //   };
    //   simulatedMinutes.remove();
    // };
    
    if(outputEnabled) {
      const result = simulate(warehouses, customers, orders, input.typesOfDrones, programMinutes, realMilliseconds, orderStatus, frequency, chargingStations);
      biggestDistance = result.biggestDistance;
      dronesTypesUsed = result.dronesTypesUsed;
    } else {
      const result = simulate(warehouses, customers, orders, input.typesOfDrones, 0, 0);
      biggestDistance = result.biggestDistance;
      dronesTypesUsed = result.dronesTypesUsed;
    }
 
    const output = generateOutput(dronesTypesUsed, biggestDistance, orders.length)
    generateTemplate(output);

  } catch (e) {
    clearPreviousResult();
    generateErrorTemplate(e.message);
    return;
  }
};