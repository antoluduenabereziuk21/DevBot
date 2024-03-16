const {addKeyword} = require('@bot-whatsapp/bot')
const {idleStart, idleStop} = require("../../../utils/idle.util");
const {setRandomDelay} = require("../../../utils/delay.util");
const chalk = require('chalk');
const {postSlack} = require("../../../http/slack.http");
const { processOrderWA } = require('../../../services/orderdetails.service');
const { createOrder } = require('../../../http/order.http');
const createOrderWA = require('../../../services/orderCreate.service');
const REGEX_KEYWORD = "/Recojo en tienda/g";
const {orderWAMiddleware} = require("../../../middlewares/order.middleware");


const localpickupFlow = addKeyword(REGEX_KEYWORD, {regex: true})
.addAction(async (ctx, {globalState, gotoFlow, provider}) => {
    idleStop(ctx);
})
    .addAction(async (ctx, {globalState, gotoFlow, provider}) => {
        await provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "🤩"}});
    })
    .addAnswer("😉 Sirvase pasar a nuestro local, inmediatamente le enviaremos nuestra *dirección 🏠 y su comprobante 📄* 💁🏻‍♀️"
        , {delay: setRandomDelay(800, 550)}
        , async (ctx, {provider, extensions}) => {
            try {
                await extensions.utils.typing(provider, {
                    delay1: setRandomDelay(800, 550),
                    delay2: setRandomDelay(2750, 1950),
                    ctx
                })
                await provider.vendor.sendMessage(ctx?.key?.remoteJid, {
                    location: {
                        degreesLatitude: -14.070852320268422,
                        degreesLongitude: -75.73593907828425,
                        url: "https://maps.app.goo.gl/BgARzuqWJ9Wui3b29",
                        comment: "Visitanos en familia con tus amigos, te esperamos!"
                    }
                });
                await provider.vendor.sendPresenceUpdate("paused", ctx?.key?.remoteJid);
            } catch (error) {
                console.error(bgRed("ERROR FLUJO onFlow"), error);
                await postSlack({text: `[ERROR FLUJO ONFLOW:]` + error})
            }
        }
    )
    .addAction(async (ctx, ctxFn) => {
        //No quiere delivery por ello va false
        await orderWAMiddleware(ctx, ctxFn,false);
        return ctxFn.endFlow();
    })

module.exports = localpickupFlow
