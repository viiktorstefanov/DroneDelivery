import { Warehouse } from "./Warehouse.js";

export function createWarehouses(warehousesFromInput) {

    const warehouses = warehousesFromInput.map((warehouse) => {
        return new Warehouse(warehouse.x, warehouse.y, warehouse.name);
    }); 

    return warehouses;
}