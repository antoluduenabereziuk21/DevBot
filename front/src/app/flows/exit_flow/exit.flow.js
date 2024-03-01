const {addKeyword, EVENTS} = require("@bot-whatsapp/bot");
const {setRandomDelay} = require("../../../utils/delay.util");
const chalk = require("chalk");
const {postSlack} = require("../../../http/slack.http");
const {idleStop} = require("../../../utils/idle.util");
const REGEX_EXIT= '/❌Salir del Sistema/g';

const logoutFlow = addKeyword(REGEX_EXIT,{regex: true})
    .addAction(async (ctx) => {
      idleStop(ctx);
    })
    .addAction(async (ctx, {extensions,provider,flowDynamic, state,endFlow}) => {
        try {
            const from = ctx?.from;
            const jid= ctx?.key?.remoteJid;
            const myState = state.getMyState();
            //await provider.vendor.readMessages([ctx?.key]);
            myState[from] = {...myState[from], on: false}
            console.log("BOT APAGADO desde flujo LogoutFlow-> ", myState);
            await extensions.utils.typing(provider, {delay1: setRandomDelay(750,550), delay2: setRandomDelay(1750,1480), ctx});
            await flowDynamic([{body:"Gracias por usar nuestros servicios, hasta pronto 👋🏽\n _Recuerda que puedes volver a iniciar el bot escribiendo_ *#empezar*"}]);
            await provider.vendor.sendPresenceUpdate("paused", jid);

            await extensions.utils.typing(provider, {delay1: setRandomDelay(700,500), delay2: setRandomDelay(950,580), ctx});
            await flowDynamic([{body:"👾 @Author @Rpeche-pk"}]);
            await provider.vendor.sendPresenceUpdate("paused", jid);

            await extensions.utils.typing(provider, {delay1: setRandomDelay(650,500), delay2: setRandomDelay(750,540), ctx});
            const baileys = await provider.vendor.sendMessage(jid, {
                text: "https://github.com/Rpeche-pk",
            });
            await provider.vendor.sendMessage(jid, {react: {key: baileys?.key, text: "👾"}});
            await provider.vendor.sendPresenceUpdate("paused", jid);
            return endFlow();
        } catch (error) {
            await postSlack({
                text: `Error en el FLOW logoutFlow: ${error.message}`
            });
            console.error(chalk.red.bold("ERROR FLUJO offFlow"), error.message);
        }
    });

const timeoutFlow= addKeyword(EVENTS.ACTION,{})
    .addAction(async (ctx, {extensions,provider,endFlow}) => {
        try {
            const jid = ctx?.key?.remoteJid;
            await extensions.utils.typing(provider, {delay1: 650, delay2: 1000, ctx})
            await provider.vendor.sendMessage(jid, {text: "❌ Se ha agotado el tiempo de respuesta ❌"});
            await provider.vendor.sendPresenceUpdate("paused", jid);
            return endFlow();
        } catch (e) {
            await postSlack({
                text: `Error en el FLOW timeoutFlow: ${e.message}`
            });
            console.error(chalk.red.bold("Error en el flujo timeoutFlow"), e.message)
        }
    });

const sessionExpiredFlow = addKeyword(EVENTS.ACTION,{})
    .addAction(async (ctx, {extensions,provider,endFlow}) => {
        try {
            const jid = ctx?.key?.remoteJid;
            await extensions.utils.typing(provider, {delay1: setRandomDelay(750,550), delay2: setRandomDelay(1750,1555), ctx})
            await provider.vendor.sendMessage(jid, {text: "❌ Su sesión dentro del sistema ha expirado ❌ , *vuelva a iniciar el bot escribiendo* 👉🏽 *#empezar*"});
            await provider.vendor.sendPresenceUpdate("paused", jid);

            return endFlow();
        } catch (e) {
            await postSlack({
                text: `Error en el FLOW sessionExpiredFlow: ${e.message}`
            });
            console.error(chalk.red.bold("Error en el flujo sessionExpiredFlow"), e.message)
        }
    });

module.exports = {logoutFlow,timeoutFlow,sessionExpiredFlow};