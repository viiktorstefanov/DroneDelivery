export function parseAndConvertCapacity(capacity) {
    const capacityNumber = parseInt(capacity);
    if (capacity.includes("kW")) {
      return capacityNumber * 1000;
    }
    return capacityNumber;
  }