import { generateTableTemplate } from "./generateTableTemplate.js";

export const generateTemplate = (result) => {
  let dronesCount = result.dronesCount;
  let averageTime = result.averageTime;

  const data = result.tableData;

  const resultSection = document.getElementById("result");

  const totalTimeSpan = document.createElement("span");
  totalTimeSpan.classList = "result";
  totalTimeSpan.textContent = `Total time for all orders: ${result.totalTime} minutes`;

  const droneCountSpan = document.createElement("span");
  droneCountSpan.classList = "result";
  droneCountSpan.textContent = `Drones used: ${dronesCount}`;

  const averageTimeSpan = document.createElement("spna");
  averageTimeSpan.classList = "result";
  averageTimeSpan.textContent = `Average time: ${averageTime} minutes`

  const divTypesDrones = document.createElement("div");
  divTypesDrones.classList = "droneTypes";

  resultSection.appendChild(totalTimeSpan);
  resultSection.appendChild(droneCountSpan);
  resultSection.appendChild(averageTimeSpan);
  
  generateTableTemplate(data, divTypesDrones);
  
  resultSection.appendChild(divTypesDrones);

};
