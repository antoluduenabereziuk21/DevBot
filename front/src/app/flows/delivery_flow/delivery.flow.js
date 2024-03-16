const {setRandomDelay} = require("../../../utils/delay.util");
const {captureDataMiddleware, captureAddressMiddleWare} = require("../../../middlewares/order.middleware");
const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const chalk = require("chalk");
const {orderWAMiddleware} = require("../../../middlewares/order.middleware");
const ORDEN = require('../../../utils/constants.util');
const {idleStop, idleStart,idleReset} = require("../../../utils/idle.util");

const REGEX_KEYWORD = "/Directo a mi casa adicional 200/g"; 
const deliveryFlow = addKeyword(REGEX_KEYWORD, {regex: true})
.addAction(async (ctx, {provider,flowDynamic, extensions}) => {
    idleStop(ctx)
})
.addAction(async (ctx, {provider,flowDynamic,gotoFlow,globalState, extensions}) => {
    idleStart(ctx, gotoFlow, globalState.getMyState().timer);
    await extensions.utils.typing(provider, {
        delay1: setRandomDelay(800, 550),
        delay2: setRandomDelay(2500, 1850),
        ctx
    });
    await flowDynamic([{body: `😀 Perfecto, continuemos 💁🏻‍♀️`}]);
    await provider.vendor.sendPresenceUpdate("paused", ctx.key.remoteJid);
})
.addAnswer([
        `🚀 Perfecto, para *continuar* con su *pedido*, necesitaré que me proporciones tu información 💁🏻‍♀️`]
    , {delay: setRandomDelay(850, 500)}
    , async (ctx, {flowDynamic, provider, extensions,state}) => {
        
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
        idleReset(ctx, ctxFn.gotoFlow, ctxFn.globalState.getMyState().timer);
        const myState = ctxFn.state.getMyState();
        const body = ctx?.body.trim();
        //se realiza la validacion para que no sea espacio en blanco
        await captureDataMiddleware("name", ctx, ctxFn);
        myState[ctx?.from] = {...myState[ctx?.from], data: {name: body}};
    })
    .addAnswer("📌 Ahora proporcioname tu apellido\n📋 *Apellido Completo*: Ejemplo: _Peña Vilchez_",null,null)
    .addAction({capture: true}, async (ctx, ctxFn) =>{
        idleReset(ctx, ctxFn.gotoFlow, ctxFn.globalState.getMyState().timer);
        const myState = ctxFn.state.getMyState();
        const body = ctx?.body.trim();
        await captureDataMiddleware("last_name", ctx, ctxFn);
        myState[ctx?.from] = {...myState[ctx?.from], data: {last_name: body}};
    })
    .addAnswer("🏡 Ahora por favor proporcioname tu dirección\n📌 *Dirección*: Ejemplo: _Av. Los Pinos 123_",null,null)
    .addAction({capture:true},async (ctx, ctxFn) => {
        idleReset(ctx, ctxFn.gotoFlow, ctxFn.globalState.getMyState().timer);
        const myState = ctxFn.state.getMyState();
        const body = ctx?.body.trim();
        await captureAddressMiddleWare("address", ctx, ctxFn);
        myState[ctx?.from] = {...myState[ctx?.from], data: {address: body}};
    })
    .addAnswer("🏤 Por último, indicame alguna referencia de su dirección\n📌*Referencia*: Ejemplo: _Frente a la tienda de la esquina_",null,null)
    .addAction({capture:true},async (ctx, ctxFn) => {
        idleReset(ctx, ctxFn.gotoFlow, ctxFn.globalState.getMyState().timer);
        const myState = ctxFn.state.getMyState();
        const body = ctx?.body.trim();
        await captureAddressMiddleWare("reference", ctx, ctxFn);
        myState[ctx?.from] = {...myState[ctx?.from], data: {reference: body}};   
    })
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.flowDynamic([{body: "📝 Perfecto, ya tengo toda tu información para continuar con tu pedido"}]);
        //AQUI GENERAMOS EL COMPROBANTE DE COMPRA Y LO ENVIAMOS AL USUARIO
        //antes de mandar la order hacer un 
        await orderWAMiddleware(ctx, ctxFn,true);        
    });
module.exports = deliveryFlow;