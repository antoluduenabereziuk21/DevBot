const {addKeyword, EVENTS} = require('@bot-whatsapp/bot')
const {processOrderWA} = require('../../../services/orderdetails.service');
const {setRandomDelay} = require('../../../utils/delay.util');
const {postSlack} = require("../../../http/slack.http");
const userstateMiddleware = require("../../../middlewares/userstate.middleware");
const strategy = require("./strategy/strategy.class");
const {idleStart, idleReset,idleStop} = require("../../../utils/idle.util");
//TODO reveer bug de intentos , intentos debe estar asociado a cada usario, ahora esta como global
let intents = 5;
const catalogFlow = addKeyword(EVENTS.ORDER, {})
.addAction(async (ctx, {provider, flowDynamic}) => {
    idleStop(ctx);
})
    .addAction(async (ctx, {globalState, gotoFlow,provider}) => {
        idleStart(ctx, gotoFlow, globalState.getMyState().timer);
        await provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "🤩"}});
    })
    .addAction(userstateMiddleware)
    .addAction(async (ctx, {provider, flowDynamic, extensions, state}) => {
        try {
            let oId = ctx.message.orderMessage.orderId;
            let oToken = ctx.message.orderMessage.token;
            const jid = ctx.key.remoteJid;
            const myState = state.getMyState();
            
            const {orderConfirm, currency, total1000} = await processOrderWA(oId, oToken, provider, ctx);

            await extensions.utils.typing(provider, {
                delay1: setRandomDelay(800, 570),
                delay2: setRandomDelay(3100, 2500),
                ctx
            });

            myState[ctx?.from]= {...myState[ctx?.from], order: {
                idOrder:oId,
                tokenOrder: oToken,
            },
            };
            console.log("MY ESTADO ES: ",state.getMyState());
           // await createOrder(GLOBAL_ORDER);
            /*create order Habria que mandarlo luego de la seleccion de envio(retiro en local total === , envio a domicilio total +++ costo del envio)
                costo del envio 
                quentity =  1 description = delivery amount = 100
               */ 
            await provider.paymentOrder(jid,currency,total1000,
                //"No presione el botón de pago hasta que el bot lo indique."
                orderConfirm
                );
            
            await provider.vendor.sendPresenceUpdate("paused", jid);

            await extensions.utils.typing(provider, {
                delay1: setRandomDelay(800, 500),
                delay2: setRandomDelay(2850, 2300),
                ctx
            });
            await flowDynamic([{
                body: `📌 Desea continuar con el pedido?\nPor favor digite una opción\n╠1️⃣ _Continuar_\n╙2️⃣ _Cancelar_`,
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
        try{
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
            await strategyMethod(ctx, {gotoFlow,provider,extensions});
        }catch (e) {
            console.log("Error en el catalogFlow", e);
            await postSlack(e.message, "Error en el catalogFlow")
        }
    });

module.exports = catalogFlow;