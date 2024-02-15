const boxen = require("boxen");

function logError(message) {
    console.log(
        tryBoxen(message, {
            title: "Error",
            padding: 0.7,
            margin: 1,
            borderColor: "red",
        })
    );
}

function logSuccess(message) {
    console.log(
        tryBoxen(message, {
            title: "Success",
            padding: 0.7,
            margin: 1,
            borderColor: "green",
        })
    );
}

function logWarning(message) {
    console.log(
        tryBoxen(message, {
            title: "Warning",
            padding: 0.7,
            margin: 1,
            borderColor: "yellow",
        })
    );
}

/**
 * Boxen can throw an error if the input is malformed, so this function wraps it in a try/catch.
 * @param {string} input
 * @param {*} options
 */
function tryBoxen(input, options) {
    try {
        return boxen(input, options);
    } catch {
        return input;
    }
}

module.exports = {
    logError,
    logSuccess,
    logWarning,
};
