const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const {setRandomDelay} = require("../../../utils/delay.util");
const simulateTypingMiddleware = require("../../../middlewares/order.middleware");
const {idleReset} = require("../../../utils/idle.util");
const {captureDataMiddleware, captureAddressMiddleWare} = require("../../../middlewares/order.middleware");
let intents = 2;

const orderFlow = addKeyword(EVENTS.ACTION, {})
    .addAction(simulateTypingMiddleware)
    .addAnswer([
            `🚀 Perfecto, para *continuar* con su *pedido*, necesitaré que me proporciones tu información 💁🏻‍♀️`]
        , {delay: setRandomDelay(850, 500)}
        , async (ctx, {flowDynamic, provider, extensions,state}) => {
            //CAPTURO SU NUMERO DE CELULAR
            const myState = state.getMyState();
            myState[ctx?.from] = {...myState[ctx?.from], data: {cel_phone: ctx.from}};
            await state.update(myState);
            await provider.sendSticker(ctx.key.remoteJid, "https://ik.imagekit.io/ljpa/zephyr-cygnus/products/stickers/1606939691.webp");
            await extensions.utils.typing(provider, {
                delay1: setRandomDelay(800, 550),
                delay2: setRandomDelay(2100, 1750),
                ctx
            });
            await flowDynamic([{body: "📌 Por favor, proporciona tu información para continuar con tu pedido\n📝 *Nombre Completo*: _Ejemplo: María Angela_"}]);
            await provider.vendor.sendPresenceUpdate("paused", ctx.key.remoteJid);
        })
    .addAction({capture: true}, async (ctx, ctxFn) => {
        await captureDataMiddleware("name", ctx, ctxFn);
    })
    .addAnswer("📌 Ahora proporcioname tu apellido\n📋 *Apellido Completo*: Ejemplo: _Peña Vilchez_",null,null)
    .addAction({capture: true}, async (ctx, ctxFn) =>{
        await captureDataMiddleware("last_name", ctx, ctxFn);
    })
    .addAnswer("🏡 Ahora por favor proporcioname tu dirección\n📌 *Dirección*: Ejemplo: _Av. Los Pinos 123_",null,null)
    .addAction({capture:true},async (ctx, ctxFn) => {
        await captureAddressMiddleWare("address", ctx, ctxFn);
    })
    .addAnswer("🏤 Por último, indicame alguna referencia de su dirección\n📌*Referencia*: Ejemplo: _Frente a la tienda de la esquina_",null,null)
    .addAction({capture:true},async (ctx, ctxFn) => {
        await captureAddressMiddleWare("reference", ctx, ctxFn);
    })

module.exports = {orderFlow}
