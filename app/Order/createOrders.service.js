import { generateRandomId } from "../services/generateId.js";
import { Order } from "./Order.js";


export function createOrders(inputOrders, customers) {
    const currentOrders = inputOrders.map(order => {

        const randomId = generateRandomId("drone");
        const customerName = customers.filter(c => c.id === order.customerId)[0].name;
        return new Order(order.customerId, order.productList, randomId, customerName)
    });

    return currentOrders;
};