const {addKeyword} = require('@bot-whatsapp/bot')
const {idleStart} = require("../../../utils/idle.util");
const {setRandomDelay} = require("../../../utils/delay.util");
const {bgRed} = require("chalk");
const {postSlack} = require("../../../http/slack.http");
const REGEX_KEYWORD = "/Recojo en tienda/g";

const localpickupFlow = addKeyword(REGEX_KEYWORD, {regex: true})
    .addAction(async (ctx, {globalState, gotoFlow, provider}) => {
        idleStart(ctx, gotoFlow, globalState.getMyState().timer);
        await provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "🤩"}});
    })
    .addAction(async (ctx, {provider, extensions}) => {
      //AQUI DEBERIA GENERAR UN PIN DE RECOJO DE LA ORDEN
    })
    .addAnswer("😉 Sirvase pasar a nuestro local, inmediatamente le enviaremos nuestra *dirección*"
        , {delay: setRandomDelay(800, 550)}
        , async (ctx, {provider, extensions}) => {
            try {
                await extensions.utils.typing(provider, {
                    delay1: setRandomDelay(800, 550),
                    delay2: setRandomDelay(2500, 1850),
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
    );

module.exports = localpickupFlow
