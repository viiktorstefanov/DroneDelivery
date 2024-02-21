import { MapCoverage } from "./MapCoverage.js";

export function createMapCoverage(input) {
    const mapBoundaryX = input.x;
    const mapBoundaryY = input.y;

    const coordinates = {
        x: mapBoundaryX,
        y: mapBoundaryY,
      };

    const currentMapCoverage = new MapCoverage(coordinates);
  
    return currentMapCoverage;
  }
  