export function getRealTimePerProgramMinute(programMinutes, realLifeMilliseconds) {
    return realLifeMilliseconds / programMinutes;
};

export function convertProgramMinutesToRealLifeMilliseconds(programMinutes, realPerProgram) {
    return programMinutes * realPerProgram;
};