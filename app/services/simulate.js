import { createDrone } from "../Drone/createDrone.js";
import { calculateDistance } from "./calculateDistance.js";
import { findNearestWarehouse } from "./findNearestWarehouse.js";
import { parseAndConvertCapacity } from "./parseAndConvertCapacity.js";
import {convertProgramMinutesToRealLifeMilliseconds} from './programTimeConverter.js'


export async function simulate(
  warehouses,
  customers,
  orders,
  inputTypesOfDrones,
  realPerProgram,
  outputEnabled,
  orderStatus,
  frequency,
  chargingStations
) {
    
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

  return new Promise(async (resolve) => {
    const orderPromises = [];
    
    for(let order of orders.filter(order => order.status !== 'already delivered')) {
      orderPromises.push(
        new Promise((resolveOrder) => {
          
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

          let droneForDelivery = false;
          const findAndDeliver = () => {
            //check available drones in warehouse
            for (const drone of warehouse.drones) {
              const reqBattery = distanceToCustomer * drone.consumption;
              const currentBattery = drone.currentBatteryCapacity;
              const batteryToDeliver = currentBattery - reqBattery;

              if (
                batteryToDeliver > 0 &&
                !drone.isDelivering &&
                !drone.isCharging
              ) {
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

                const finishOrder = () => {
                  if (orderStatus) {
                    order.changeStatusToDelivered();
                  }

                  if (distanceToCustomer > biggestDistance) {
                    biggestDistance = distanceToCustomer;
                  }

                  drone.updateCoordinates(
                    customer.coordinates.x,
                    customer.coordinates.y
                  );
                  resolveOrder();
                };

                let timeForDeliver = outputEnabled ? convertProgramMinutesToRealLifeMilliseconds(distanceToCustomer, realPerProgram) : 0;
                
                //go deliver
                drone.deliver(
                  reqBattery,
                  order.productList,
                  customer.name,
                  timeForDeliver,
                  finishOrder
                );

                if (orderStatus) {
                    order.changeStatusToCurrently();
                  };

                // for recharge must think about can go to wHouse or cStation
                // and does have enough battery to get products from wHouse and deliver and optimization
                // if(drone.batteryPercentage <= 5) {
                //   drone.goToCharge(chargingStations, warehouses);
                // };

                break;
              }
            }
          };

          if (warehouse.drones.length > 0) {
            findAndDeliver();
          };

          //no available drones in warehouse
          if (!droneForDelivery) {
            for (const droneType of inputTypesOfDrones) {
              const reqBattery = distanceToCustomer * droneType.consumption;
              const baterry = droneType.capacity;
              const batteryToDeliver = baterry - reqBattery;

              if (batteryToDeliver >= 0) {
                warehouse.drones.push(createDrone(droneType));
                findAndDeliver();
                break;
              }
            }
          }
        })
      );
    };

    await Promise.all(orderPromises);
    return resolve({ dronesTypesUsed, biggestDistance });
  });
}
