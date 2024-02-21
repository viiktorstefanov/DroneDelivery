import { calculateDistance } from "./calculateDistance.js";
import { findNearestWarehouse } from "./findNearestWarehouse.js";

export function calculateTotalTimeAndDrones(
  warehouses,
  customers,
  drones,
  orders
) {
  let totalTime = 0;
  const stayAtWarehouse = 5;
  const speed = 1;
  let dronesCount = 0;
  let customer;

  orders.forEach((order) => {
    const orderCustomerId = order.customerId;

    customer = customers.filter(
      (customer) => customer.id === orderCustomerId
    )[0];

    const warehouse = findNearestWarehouse(customer, warehouses);

    const distanceToCustomer = calculateDistance(
      warehouse.coordinates.x,
      warehouse.coordinates.y,
      customer.coordinates.x,
      customer.coordinates.y
    );

    if (drones) {
      for (const drone of drones) {
        const requiredEnergy = distanceToCustomer * drone.consumption;

        if (
          requiredEnergy <= drone.currentBatteryCapacity &&
          !drone.isCharging
        ) {
          drone.updateBattery(distanceToCustomer);
          dronesCount++;
          const products = order.productList;
          const productListArray = Object.entries(products).map(([item, quantity]) => `${quantity} ${item}`);
          console.log(
            `Order for ${customer.name} is shipped with products:`
          );
          console.table(productListArray);
          break;
        } else {
          drone.chargeBattery();
        }
      }
    } else {
      dronesCount = orders.length;
    }

    const deliveryTime = (distanceToCustomer + stayAtWarehouse) / speed;
    totalTime += deliveryTime;
  });

  return { totalTime: totalTime.toFixed(2), dronesCount };
}
