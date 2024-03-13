const {idleStart, idleReset, idleStop} = require("../utils/idle.util");
const {setRandomDelay} = require("../utils/delay.util");
const createOrderWA = require("../services/orderCreate.service");
const {createOrder} = require("../http/order.http");
const chalk = require("chalk");
const { postSlack } = require("../http/slack.http");
const { createClient } = require("../http/client.http");
const createClientWA = require("../services/clientCreate.service");


let intents = 2;
const simulateTypingMiddleware = async (ctx, {provider, gotoFlow, globalState, extensions}) => {
    idleStart(ctx, gotoFlow, globalState.getMyState().timer);
    await extensions.utils.typing(provider, {
        delay1: setRandomDelay(750, 550),
        delay2: setRandomDelay(2980, 2500),
        ctx
    });
    await provider.vendor.sendPresenceUpdate("available", ctx?.key?.remoteJid);
    await extensions.utils.wait(setRandomDelay(950, 750))
    await provider.vendor.sendPresenceUpdate("paused", ctx?.key?.remoteJid);
}

const captureDataMiddleware = async (field, ctx, ctxFn) => {
    idleReset(ctx, ctxFn.gotoFlow, ctxFn.globalState.getMyState().timer)
    const body = ctx?.body.trim();
    const myState = ctxFn.state.getMyState();
    const regexName = new RegExp(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\- ]{2,50}$|^$/);
    await ctxFn.provider.vendor.readMessages([ctx?.key]);

    if (!regexName.test(body)) {
        await ctxFn.extensions.utils.tryAgain(intents, ctxFn, {ctx, state: myState});
        intents--;
        return
    }
    //todo resetear intents
    intents = 2;
    myState[ctx?.from] = {...myState[ctx?.from], data: {...myState[ctx?.from].data,[field]: body}};
    await ctxFn.state.update(myState);
    await ctxFn.provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "👍"}});
    await ctxFn.extensions.utils.typing(ctxFn.provider, {
        delay1: setRandomDelay(750, 550),
        delay2: setRandomDelay(2500, 1800),
        ctx
    });
    await ctxFn.provider.vendor.sendPresenceUpdate("paused", ctx?.key?.remoteJid);
}

const captureAddressMiddleWare = async (field, ctx, ctxFn) =>{
    idleReset(ctx, ctxFn.gotoFlow, ctxFn.globalState.getMyState().timer)
    await ctxFn.provider.vendor.readMessages([ctx?.key]);
    const myState = ctxFn.state.getMyState();
    const body = ctx?.body.trim();

    myState[ctx?.from] = {...myState[ctx?.from], data: {...myState[ctx?.from].data,[field]: body}};
    await ctxFn.state.update(myState);
    await ctxFn.extensions.utils.typing(ctxFn.provider, {
        delay1: setRandomDelay(650, 500),
        delay2: setRandomDelay(2600, 1850),
        ctx
    });
    await ctxFn.provider.vendor.sendPresenceUpdate("paused", ctx?.key?.remoteJid);
}

/**
 * Despues de que el usuario confirma su pedido, se procede a crear el pedido en la api 
 *
 * @param {Object} ctx
 * @param {Object} ctxFn
 * @param {Boolean} delivery
 */
const orderWAMiddleware = async (ctx, ctxFn, delivery= false) => {

    //AQUI GENERAMOS EL COMPROBANTE DE COMPRA Y LO ENVIAMOS AL USUARIO
    let myState = ctxFn.state.getMyState();
    try{ 
        const {order} = await ctxFn.state.get(ctx?.from)
        const reponseCarWa = await createOrderWA(order.idOrder,order.tokenOrder,ctxFn,delivery)
        console.log(chalk.blue("reponseCarWa"),reponseCarWa);
        //await create cliente,seter los datosCliente -> s
        const responseApi = await createOrder(reponseCarWa);
        //nos debe retornar el pdf la api
        //const bytePdf= await createOrder(GLOBAL_ORDER);
        console.log(chalk.blue("responseApi"),responseApi.status);
        idleStop(ctx);
        return ctxFn.endFlow("Gracias por su compra, recuerda si deseas pedir algo más, no dudes en escribir *#empezar*. 😊")
    }catch (error){
        console.error(chalk.bgRed("ERROR FLUJO localpickupFlow"), error);
        await postSlack({text: `[ERROR FLUJO localpickupFlow:]` + error})
    }finally {
        await ctxFn.state.clear(ctx?.from);
        myState = Object.assign({}, myState);
    }
}

const clientMiddleware = async(ctxFn,delivery=false)=>{
   try {
    const resposeClientWa = await createClientWA(ctxFn,delivery=fasle);
    console.log(chalk.blue("reponseClientWA"),resposeClientWa);
   } catch (error) {
    
   }
    


}

module.exports = {
    simulateTypingMiddleware, 
    captureDataMiddleware,
    captureAddressMiddleWare,
    orderWAMiddleware
}
