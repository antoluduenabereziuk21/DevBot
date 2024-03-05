const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const {setRandomDelay} = require("../../../utils/delay.util");
const simulateTypingMiddleware = require("../../../middlewares/order.middleware");
const {idleReset, idleStart, idleStop} = require("../../../utils/idle.util");
const {captureDataMiddleware, captureAddressMiddleWare} = require("../../../middlewares/order.middleware");
const pollMiddleware = require("../../../middlewares/poll.middleware");
let intents = 2;

const orderFlow = addKeyword(EVENTS.ACTION, {})
    .addAction(async (ctx, {globalState, gotoFlow}) => {
        idleStop(ctx);
      idleStart(ctx, gotoFlow, globalState.getMyState().timer);
    })
    .addAction(simulateTypingMiddleware)
    .addAnswer("🛒 Perfecto, que opción prefiere?\n_Pulse sobre ella_ 😱"
        ,{
            capture: true,
            delay: setRandomDelay(950, 850),
            buttons: [{"body": "*Recojo en tienda*"}, {"body": "*Directo a mi casa*"}, {"body": "❌Cancelar pedido"}]
        }
        ,pollMiddleware);

module.exports = {orderFlow}
