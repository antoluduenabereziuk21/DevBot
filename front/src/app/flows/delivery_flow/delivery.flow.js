const {setRandomDelay} = require("../../../utils/delay.util");
const {captureDataMiddleware, captureAddressMiddleWare} = require("../../../middlewares/order.middleware");
const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const chalk = require("chalk");
const {orderWAMiddleware} = require("../../../middlewares/order.middleware");
const ORDEN = require('../../../utils/constants.util');

const REGEX_KEYWORD = "/Directo a mi casa/g"; 
const deliveryFlow = addKeyword(REGEX_KEYWORD, {regex: true})
.addAction(async (ctx, {provider,flowDynamic, extensions}) => {
    await extensions.utils.typing(provider, {
        delay1: setRandomDelay(800, 550),
        delay2: setRandomDelay(2500, 1850),
        ctx
    });
    await flowDynamic([{body: `😀 Perfecto, el _servicio de delivery_ tendra un costo adicional de *$ ${ORDEN.DELIVERY_COST}* 💁🏻‍♀️`}]);
    await provider.vendor.sendPresenceUpdate("paused", ctx.key.remoteJid);
})
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
        const myState = ctxFn.state.getMyState();
        //se realiza la validacion para que no sea espacio en blanco
        await captureDataMiddleware("name", ctx, ctxFn);
        myState[ctx?.from] = {...myState[ctx?.from], data: {name: ctx.from}};
    })
    .addAnswer("📌 Ahora proporcioname tu apellido\n📋 *Apellido Completo*: Ejemplo: _Peña Vilchez_",null,null)
    .addAction({capture: true}, async (ctx, ctxFn) =>{
        const myState = ctxFn.state.getMyState();
        await captureDataMiddleware("last_name", ctx, ctxFn);
        myState[ctx?.from] = {...myState[ctx?.from], data: {last_name: ctx.from}};
    })
    .addAnswer("🏡 Ahora por favor proporcioname tu dirección\n📌 *Dirección*: Ejemplo: _Av. Los Pinos 123_",null,null)
    .addAction({capture:true},async (ctx, ctxFn) => {
        const myState = ctxFn.state.getMyState();
        await captureAddressMiddleWare("address", ctx, ctxFn);
        myState[ctx?.from] = {...myState[ctx?.from], data: {cel_phone: ctx.from}};
    })
    .addAnswer("🏤 Por último, indicame alguna referencia de su dirección\n📌*Referencia*: Ejemplo: _Frente a la tienda de la esquina_",null,null)
    .addAction({capture:true},async (ctx, ctxFn) => {
        const myState = ctxFn.state.getMyState();
        await captureAddressMiddleWare("reference", ctx, ctxFn);
        myState[ctx?.from] = {...myState[ctx?.from], data: {cel_phone: ctx.from}};   
    })
    .addAction(async (ctx, {provider, extensions,state,endFlow}) => {
        //AQUI GENERAMOS EL COMPROBANTE DE COMPRA Y LO ENVIAMOS AL USUARIO
        //antes de mandar la order hacer un 
        const response =await orderWAMiddleware(ctx, {provider, endFlow, state}, true);

        //post put/update cellPhone{ cliente }
        console.log(response);
    });
module.exports = deliveryFlow;