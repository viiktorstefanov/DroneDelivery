import { generateRandomId } from "../services/generateId.js";
import { Order } from "./Order.js";


export function createOrders(inputOrders) {
    const currentOrders = inputOrders.map(order => {

        const randomId = generateRandomId("drone");

        return new Order(order.customerId, order.productList, randomId)
    });

    return currentOrders;
};