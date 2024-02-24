export function generateOutput(dronesTypesUsed, totalDistance, ordersLength) {
    const speed = 1;

    const totalTimeOrders = totalDistance / speed;

    const totalTime = totalTimeOrders + 5;

    const dronesCount = dronesTypesUsed.dronesCount1TypeDrone + dronesTypesUsed.dronesCount2TypeDrone + dronesTypesUsed.dronesCount3TypeDrone;

    const averageTime = Math.ceil(totalTime / ordersLength);

    const tableData = [
        { capacity: '500W' , quantity: dronesTypesUsed.dronesCount1TypeDrone },
        { capacity: '1kW' , quantity: dronesTypesUsed.dronesCount2TypeDrone },
        { capacity: '2kW' , quantity: dronesTypesUsed.dronesCount3TypeDrone },
    ];

    return { dronesCount, dronesTypesUsed, totalTime, tableData, averageTime }
};