import { findNearestStation } from "../services/findNearestStation.js";
import { showOrderProducts } from "../services/showProducts.js";

export class Drone {
    constructor(capacity, consumption, id, type) {
        this.capacity = capacity;
        this.consumption = consumption;
        this.currentBatteryCapacity = capacity;
        this.batteryPercentage = 100;
        this.isCharging = false;
        this.ordersCount = 0;
        this.isCounted = false;
        this.id = id;
        this.type = type || '';
        this.isDelivering = false;
        this.status = '';
        this.isAtWarehouse = true;
        this.coordinates = {
            x: 0,
            y: 0,
        };
    };

    deliver(reqBattery, order, customer, distanceToCustomer) {

        const timeForDeliver = distanceToCustomer;
        this.isDelivering = true;
        this.currentBatteryCapacity -= reqBattery;
        this.batteryPercentage = Math.floor((this.currentBatteryCapacity/this.capacity) * 100);
        this.isAtWarehouse = false;
        this.isCounted = true;
        setTimeout(() => {
            this.isDelivering = false;
            this.ordersCount++;
            
            
            //console products 
            showOrderProducts(order, customer);
            console.log('drone deliver');
    
            //must find how to charge
            // if (this.batteryPercentage <= 5) {
            //     this.chargeBattery();
            // }
        }, 4000)

    };

    goToCharge(stations) {
        const station = findNearestStation(this.coordinates.x, this.coordinates.y, stations);

        this.isCharging = true;
        console.log(`Drone with id: ${this.id} is charging`);
        //should be fast with fast charge
            this.currentBatteryCapacity = this.capacity;
            this.isCharging = false;
            this.batteryPercentage = 100;
            console.log(`Drone with id: ${this.id} is charged`);
        //full charge takes 20 minutes
    };

    updateCoordinates(x, y) {
        this.coordinates = {
            x,
            y
        };
    };
};