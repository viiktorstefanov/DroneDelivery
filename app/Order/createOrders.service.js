import { Order } from "./Order.js";

export function createOrders(inputOrders) {
    const currentOrders = inputOrders.map(order => new Order(order.customerId, order.productList));

    return currentOrders;
};