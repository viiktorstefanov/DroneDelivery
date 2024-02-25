import { findNearestStation } from "../services/findNearestStation.js";
import { findNearestWarehouse } from "../services/findNearestWarehouse.js";
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
        this.status = 'at warehouse';
        this.isAtWarehouse = true;
        this.coordinates = {
            x: 0,
            y: 0,
        };
    };

     deliver(reqBattery, orderProductList, customerName, timeForDeliver, onComplete) {
        
        this.isDelivering = true;
        this.currentBatteryCapacity -= reqBattery;
        this.batteryPercentage = Math.floor((this.currentBatteryCapacity/this.capacity) * 100);
        this.isAtWarehouse = false;
        this.isCounted = true;
        this.status = 'delivering';

        setTimeout(() => {
            this.isDelivering = false;
            this.status = 'delivered';
            this.ordersCount++;  
            //console products 
            showOrderProducts(orderProductList, customerName);
            onComplete();
        }, timeForDeliver)

    };

    goToCharge(stations, warehouses) {
        const station = findNearestStation(this.coordinates.x, this.coordinates.y, stations);
        const warehouse = findNearestWarehouse({x: this.coordinates.x, y: this.coordinates.y}, warehouses);
        //find the closest calculate distance 
        
        this.isCharging = true;
        console.log(`Drone with id: ${this.id} is charging`);
        //should be fast with fast charge

        const chargingTime = (this.capacity - this.currentBatteryCapacity) * 20;
        setTimeout(() => {
            this.currentBatteryCapacity = this.capacity;
            this.isCharging = false;
            this.batteryPercentage = 100;
            console.log(`Drone with id: ${this.id} is charged`);
        }, chargingTime);
        //must find how to charge
            // if (this.batteryPercentage <= 5) {
            //     this.chargeBattery();
            // }
          
        //full charge takes 20 minutes
    };

    updateCoordinates(x, y) {
        this.coordinates = {
            x,
            y
        };
    };
};