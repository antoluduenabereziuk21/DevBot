const {setRandomDelay} = require("../../../utils/delay.util");
const {captureDataMiddleware, captureAddressMiddleWare} = require("../../../middlewares/order.middleware");
const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const chalk = require("chalk");
const {processOrderWA} = require("../../../services/orderdetails.service");
const { createOrder } = require("../../../http/order.http");
const { idleStop } = require("../../../utils/idle.util");
const { postSlack } = require("../../../http/slack.http");

const REGEX_KEYWORD = "/Directo a mi casa/g"; 
const deliveryFlow = addKeyword(REGEX_KEYWORD, {regex: true})
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
    .addAction(async (ctx, {provider, extensions,state,endFlow}) => {
        //AQUI GENERAMOS EL COMPROBANTE DE COMPRA Y LO ENVIAMOS AL USUARIO
        let myState = state.getMyState();
        try{ 
            const {order} = await state.get(ctx?.from)
            const {GLOBAL_ORDER} = await processOrderWA(order.idOrder,order.tokenOrder,provider,ctx, true);
            //nos debe retornar el pdf la api
            const bytePdf= await createOrder(GLOBAL_ORDER);
            console.log(chalk.blue("Pdf y orden generados"),bytePdf);
            idleStop(ctx);
            return endFlow("Gracias por su compra, recuerda si deseas pedir algo más, no dudes en escribir *#empezar*. 😊")
        }catch (error){
            console.error(chalk.bgRed("ERROR FLUJO localpickupFlow"), error);
            await postSlack({text: `[ERROR FLUJO localpickupFlow:]` + error})
        }finally {
            await state.clear(ctx?.from);
            myState = Object.assign({}, myState);
        }
    });

module.exports = deliveryFlow;