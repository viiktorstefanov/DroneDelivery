export class Drone {
    constructor(capacity, consumption) {
        this.capacity = capacity;
        this.consumption = consumption;
        this.currentBatteryCapacity = capacity;
        this.batteryPercentage = Math.floor((this.currentBatteryCapacity/this.capacity) * 100);
        this.isCharging = false;
    };

    updateBattery(distance) {
        const requiredEnergy = distance * this.consumption;

        this.currentBatteryCapacity -= Math.floor(requiredEnergy);
        this.batteryPercentage = Math.floor((this.currentBatteryCapacity/this.capacity) * 100);
    };

    chargeBattery() {
        this.isCharging = true;
        setTimeout(() => {
            this.currentBatteryCapacity = this.capacity;
            this.isCharging = false;
            this.batteryPercentage = Math.floor((this.currentBatteryCapacity/this.capacity) * 100);
        }, 20 * 60 * 1000);
        //full charge takes 20 minutes
    };
};