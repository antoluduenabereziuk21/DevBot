const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const {getOrderWA} = require('../../../services/orderdetails.service');
const {setRandomDelay} = require('../../../utils/delay.util');
const {postSlack} = require("../../../http/slack.http");
const {createOrder} = require("../../../http/order.http")
const userstateMiddleware = require("../../../middlewares/userstate.middleware");
const strategy = require("./strategy/strategy.class");
const {idleStart, idleReset} = require("../../../utils/idle.util");

let intents = 2;
const catalogFlow = addKeyword(EVENTS.ORDER, {})
    .addAction(async (ctx, {globalState, gotoFlow,provider}) => {
        idleStart(ctx, gotoFlow, globalState.getMyState().timer);
        await provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "🤩"}});
    })
    .addAction(userstateMiddleware)
    .addAction(async (ctx, {provider, flowDynamic, extensions}) => {
        try {
            let oId = ctx.message.orderMessage.orderId;
            let oToken = ctx.message.orderMessage.token;
            const jid = ctx.key.remoteJid;

            const {orderConfirm, currency, total1000,GLOBAL_ORDER} = await getOrderWA(oId, oToken, provider, ctx);
            createOrder(GLOBAL_ORDER);
            await extensions.utils.typing(provider, {
                delay1: setRandomDelay(800, 500),
                delay2: setRandomDelay(3000, 2500),
                ctx
            });

            await provider.paymentOrder(jid,currency,total1000,"No presione el botón de pago hasta que el bot lo indique.");

            await flowDynamic([{
                body: orderConfirm,
                delay: setRandomDelay(850, 550)
            }])
            await provider.vendor.sendPresenceUpdate("paused", jid);

            await extensions.utils.typing(provider, {
                delay1: setRandomDelay(800, 500),
                delay2: setRandomDelay(2850, 2300),
                ctx
            });
            await flowDynamic([{
                body: `📌 Desea continuar con el pedido?\nPor favor digite una opción\n╠1️⃣ _Si, continuar_\n╙2️⃣ _No, cancelar_`,
            }]);
            await provider.vendor.sendPresenceUpdate("paused", jid);
        } catch (e) {
            console.log("Error en el catalogFlow", e);
            await postSlack(e.message, "Error en el catalogFlow")
        }
    })
    .addAction({capture: true}, async (ctx, {
        globalState,
        provider,
        gotoFlow,
        fallBack,
        endFlow,
        flowDynamic,
        extensions,
        state
    }) => {
        idleReset(ctx, gotoFlow, globalState.getMyState().timer);
        await provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "⏳"}});
        const myState = state.getMyState();
        const body = ctx.body.trim();
        const regExp = new RegExp(/^[1-2]$/);
        await provider.vendor.readMessages([ctx.key]);
        if (!regExp.test(body)) {
            await extensions.utils.typing(provider, {
                delay1: setRandomDelay(800, 560),
                delay2: setRandomDelay(2100, 1750),
                ctx
            });
            await flowDynamic([{body: "💢 Debe escribir una de las opciones válidas, por favor intente nuevamente."}]);
            await extensions.utils.tryAgain(intents, {provider, fallBack, endFlow}, {ctx, state: myState});
            intents--;
            return
        }

        const strategyMethod = strategy[`case_${body}`] || strategy.default;
        await strategyMethod(ctx, {gotoFlow,provider});
    })

module.exports = catalogFlow;