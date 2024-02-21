export class Customer {
    constructor(id, name, x, y) {
        this.id = id;
        this.name = name;
        this.coordinates = {
            x,
            y
        };
        this.productList = {};
    };

    addProduct(product, quantity) {
        if (this.productList.hasOwnProperty(product)) {
            this.productList[product] += quantity;
        } else {
            this.productList[product] = quantity;
        }
    }
};