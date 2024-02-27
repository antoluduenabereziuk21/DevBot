const { addKeyword ,EVENTS} = require('@bot-whatsapp/bot')
const {getOrderWA} = require('../../../services/orderdetails.service');
const { setRandomDelay } = require('../../../utils/delay.util');
const {postSlack} = require("../../../http/slack.http");

let intents = 2;
const catalogFlow = addKeyword(EVENTS.ORDER,{})
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
    .addAction({capture:true}, async (ctx, {provider, flowDynamic, extensions}) => {
        const jid = ctx.key.remoteJid;
        const body= ctx.body.trim();
        const regExp = new RegExp(/^[1-2]$/);
        if(!regExp.test(body)){

        }
    })

module.exports = catalogFlow;