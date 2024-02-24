export function generateRandomId(type) {
    let result = '';
    const characters = `${type}`;
    const numbers = '0123456789';
    const allChars = characters + numbers; // Combine characters and numbers
    const length = 10;
    for (let i = 0; i < length; i++) {
        result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    return result;
};