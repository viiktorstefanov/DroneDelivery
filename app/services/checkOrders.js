export function checkOrders(orders) {
    let allDelivered = false;
    orders.forEach(order => {
        if(order.status === 'currently in delivery' || order.status === 'to be delivered') {
            return false;
        }
        allDelivered = true;
    });

    if(allDelivered) {
        return true;
    };
}