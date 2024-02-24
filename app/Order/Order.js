export class Order {
    constructor(customerId, productList) {
        this.customerId = customerId;
        this.productList = productList;
        this.status = 'to be delivered';
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