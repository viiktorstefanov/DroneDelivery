import { createDrone } from "../Drone/createDrone.js";
import { calculateDistance } from "./calculateDistance.js";
import { findNearestWarehouse } from "./findNearestWarehouse.js";
import { parseAndConvertCapacity } from "./parseAndConvertCapacity.js";

export function simulate(warehouses, customers, orders, inputTypesOfDrones, programMinutes, realMilliseconds) {
  // 1000 milliseconds in one second.
  //60 seconds in one minute
  const simulationTime = programMinutes * (realMilliseconds / (60 * 1000));
  
    //string -> number , kw -> w
  inputTypesOfDrones.map((type) => {
    type.capacity = parseAndConvertCapacity(type.capacity);
    type.consumption = parseInt(type.consumption);
  });

  let customer;
  let biggestDistance = 0;
  const dronesTypesUsed = {
    dronesCount1TypeDrone: 0,
    dronesCount2TypeDrone: 0,
    dronesCount3TypeDrone: 0,
  };

  for (let index = 0; index < orders.length; index++) {
    const order = orders[index];

    const orderCustomerId = order.customerId;
    customer = customers.filter(
      (customer) => customer.id === orderCustomerId
    )[0];
    const warehouse = findNearestWarehouse(customer, warehouses);
    const distanceToCustomer = Math.ceil(
      calculateDistance(
        warehouse.coordinates.x,
        warehouse.coordinates.y,
        customer.coordinates.x,
        customer.coordinates.y
      )
    );

    if (warehouse.drones.length == 0) {
      //create needed drone in nearest warehouse
      while (warehouse.drones.length == 0) {
        for (const droneType of inputTypesOfDrones) {
          const reqBattery = distanceToCustomer * droneType.consumption;
          const baterry = droneType.capacity;
          const batteryToDeliver = baterry - reqBattery;

          if (batteryToDeliver >= 0) {
            warehouse.drones.push(createDrone(droneType));
            break;
          };
        };
      };
    };

    let droneForDelivery = false;

    if (warehouse.drones.length > 0) {
        //check available drones in warehouse
      for (const drone of warehouse.drones) {
        const reqBattery = distanceToCustomer * drone.consumption;
        const currentBattery = drone.currentBatteryCapacity;
        const batteryToDeliver = currentBattery - reqBattery;

        if (batteryToDeliver > 0 && !drone.isDelivering && !drone.isCharging) {
            droneForDelivery = true;

          //caluculate drone type used
          if (!drone.isCounted) {
            switch (drone.capacity) {
              case 500:
                dronesTypesUsed.dronesCount1TypeDrone++;
                break;
              case 1000:
                dronesTypesUsed.dronesCount2TypeDrone++;
                break;
              case 2000:
                dronesTypesUsed.dronesCount3TypeDrone++;
                break;
            };
          };
          //go deliver
          drone.deliver(reqBattery, order.productList, customer.name, distanceToCustomer);


          if (distanceToCustomer > biggestDistance) {
            biggestDistance = distanceToCustomer;
          };

          break;
        };
      };
    };

    //no available drones in warehouse
    if (!droneForDelivery) {
      for (const droneType of inputTypesOfDrones) {
        const reqBattery =
          distanceToCustomer * droneType.consumption;
        const baterry = droneType.capacity;
        const batteryToDeliver = baterry - reqBattery;

        if (batteryToDeliver >= 0) {
          warehouse.drones.push(createDrone(droneType));
          index -= 1;
          break;
        };
      };
    };
  };

  return { dronesTypesUsed, biggestDistance };
}
