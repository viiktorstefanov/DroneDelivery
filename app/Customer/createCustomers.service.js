import { Customer } from "./Customer.js";
import { checkCustomersLocation } from "./checkCustomersLocation.service.js";

export function createCustomers(customersFromInput, mapCoverage, orders) {

   const customersWithinMapCoverage = checkCustomersLocation(customersFromInput, mapCoverage);

   const currentCustomers = customersWithinMapCoverage.map(customer => { 
      const newCustomer = new Customer(customer.id, customer.name, customer.coordinates.x, customer.coordinates.y);
      const customerOrders = orders.filter(order => order.customerId === customer.id);
      customerOrders.forEach(order => {
          Object.entries(order.productList).forEach(([product, quantity]) => {
              newCustomer.addProduct(product, quantity);
          });
      });
      return newCustomer;
  });

   return currentCustomers;

};