export function checkCustomersLocation(customersFromInput, mapCoverage) {

    const customersWithinMapCoverage = customersFromInput.filter(customer => isWithinMapCoverage(customer.coordinates.x, customer.coordinates.y, mapCoverage));

    if(!customersWithinMapCoverage) {
        return new Error('Customers coordinates are out of range');
    };

    return customersWithinMapCoverage;
};

function isWithinMapCoverage(x, y, mapCoverage) {
    return x >= 0 && x <= mapCoverage.coordinates.x && y >= 0 && y <= mapCoverage.coordinates.y;
};