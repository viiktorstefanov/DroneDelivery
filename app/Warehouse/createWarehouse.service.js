import { Warehouse } from "./Warehouse.js";

export function createWarehouses(warehousesFromInput, products) {

    const warehouses = warehousesFromInput.map((warehouse) => {
        return new Warehouse(warehouse.x, warehouse.y, warehouse.name);
    });
    
    if(products) {
        warehouses.forEach(warehouse => {
            warehouse.products.push(products);
        });
    };

    return warehouses;
}