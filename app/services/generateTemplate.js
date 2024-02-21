export const generateTemplate = (result) => {
    const resultSection = document.getElementById('result');

        const totalTimeSpan = document.createElement('span');
        totalTimeSpan.classList = 'result';
        totalTimeSpan.textContent = result.totalTime;

        const droneCountSpan = document.createElement('span');
        droneCountSpan.classList = 'result';
        droneCountSpan.textContent = result.dronesCount;

        resultSection.appendChild(totalTimeSpan);
        resultSection.appendChild(droneCountSpan);
}