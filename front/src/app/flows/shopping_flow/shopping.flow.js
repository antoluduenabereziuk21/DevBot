const { addKeyword ,EVENTS} = require('@bot-whatsapp/bot')
const {getOrderWA} = require('../../../services/orderdetails.service');
const { setRandomDelay } = require('../../../utils/delay.util');
const {postSlack} = require("../../../http/slack.http");
const userstateMiddleware = require("../../../middlewares/userstate.middleware");

let intents = 2;
const catalogFlow = addKeyword(EVENTS.ORDER,{})
    .addAction(userstateMiddleware)
    .addAction(async (ctx, { provider , flowDynamic, extensions}) => {
        try {
            let oId = ctx.message.orderMessage.orderId;
            let oToken = ctx.message.orderMessage.token;
            const jid = ctx.key.remoteJid;

            const {orderConfirm} = await getOrderWA(oId, oToken, provider, ctx);
            await extensions.utils.typing(provider, {delay1: setRandomDelay(800, 500),delay2: setRandomDelay(3000, 2500),ctx});
            await flowDynamic([{
                body: orderConfirm,
                delay: setRandomDelay(850, 550)
            }])
            await provider.vendor.sendPresenceUpdate("paused", jid);

            await extensions.utils.typing(provider, {delay1: setRandomDelay(800, 500),delay2: setRandomDelay(2850, 2300),ctx});
            await flowDynamic([{
                body: `📌 Desea continuar con el pedido?\nPor favor digite una opción\n╠1️⃣ _Si, continuar_\n╙2️⃣ _No, cancelar_`,
            }]);
            await provider.vendor.sendPresenceUpdate("paused", jid);
        }catch (e) {
            console.log("Error en el catalogFlow", e);
            await postSlack(e.message, "Error en el catalogFlow")
        }
    })
    .addAction({capture:true}, async (ctx, {provider,fallBack,endFlow, flowDynamic, extensions,state}) => {
        const jid = ctx.key.remoteJid;
        const myState= state.getMyState();
        const body= ctx.body.trim();
        const regExp = new RegExp(/^[1-2]$/);
        await provider.vendor.readMessages([ctx.key]);
        if(!regExp.test(body)){
            await extensions.utils.typing(provider, {
                delay1: setRandomDelay(800, 560),
                delay2: setRandomDelay(2100, 1750),
                ctx
            });
            await flowDynamic([{body: "💢 Debe escribir una de las opciones válidas, por favor intente nuevamente."}]);
            await extensions.utils.tryAgain(intents, {provider, fallBack,endFlow}, {ctx, state: myState});
            intents--;
            return
        }

        console.log("body", body);

    })

module.exports = catalogFlow;