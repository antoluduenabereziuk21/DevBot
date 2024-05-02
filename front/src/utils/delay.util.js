
/**
 * funcion para calcular el tiempo de escritura de un texto
 * @param text
 * @returns {number|*}
 */
const typingTime=(text) => {
    const typingSpeed = 0.125; // caracteres por segundo
    const textLength = text.length;
    const typingTime = textLength * typingSpeed*1000;
    if (textLength >= 30) {
        return setRandomDelay(4500, 3750);
    }
    return typingTime;
}

/**
 * funcion para generar un delay aleatorio entre un rango de numeros
 * @param max
 * @param min
 * @returns {*}
 */
const setRandomDelay = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { typingTime, setRandomDelay};