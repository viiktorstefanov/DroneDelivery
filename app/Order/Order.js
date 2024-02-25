export class Order {
    constructor(customerId, productList, id, customerName) {
        this.customerId = customerId;
        this.productList = productList;
        this.status = 'to be delivered';
        this.id = id;
        this.customerName = customerName;
    };

    changeStatusToDelivered() {
        this.status = 'already delivered';
    };

    changeStatusToCurrently() {
        this.status = 'currently in delivery';
    };

    changeStatusToBeDelivered() {
        this.status = 'to be delivered';
    };

    //(to be delivered, already delivered, currently in delivery)
};