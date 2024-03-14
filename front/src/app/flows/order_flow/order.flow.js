const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const {setRandomDelay} = require("../../../utils/delay.util");
const simulateTypingMiddleware = require("../../../middlewares/order.middleware");
const {idleReset, idleStart, idleStop} = require("../../../utils/idle.util");
const {captureDataMiddleware, captureAddressMiddleWare} = require("../../../middlewares/order.middleware");
const pollMiddleware = require("../../../middlewares/poll.middleware");

const orderFlow = addKeyword(EVENTS.ACTION, {})
    .addAction(async (ctx, {state}) => {
        //CAPTURO SU NUMERO DE CELULAR
        const myState = state.getMyState();
        myState[ctx?.from] = {...myState[ctx?.from], data: {cel_phone: ctx.from}};
        await state.update(myState);
    })
    .addAction(async (ctx, {globalState, gotoFlow}) => {
      idleStart(ctx, gotoFlow, globalState.getMyState().timer);
    })
    .addAction(simulateTypingMiddleware)
    .addAnswer("🛒 Perfecto, que opción prefiere?\n_Pulse sobre ella_ 😱"
        ,{
            capture: true,
            delay: setRandomDelay(950, 850),
            buttons: [{"body": "*Recojo en tienda*"}, {"body": "*Directo a mi casa adicional 200*"}, {"body": "❌Cancelar pedido"}]
        }
        ,pollMiddleware);

module.exports = {orderFlow}
