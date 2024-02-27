const {addKeyword} = require("@bot-whatsapp/bot");
const {setRandomDelay} = require("../../../utils/delay.util");
const {randomGreeting} = require("../../../utils/greeting.util");
const chalk = require("chalk");
const {postSlack} = require("../../../http/slack.http");

const REGEX_ADVISOR= '/#asesor/';

const advisorFlow = addKeyword(REGEX_ADVISOR,{})
    .addAction(async (ctx, {extensions,provider, state,gotoFlow}) => {
        try {
            const myState = state.getMyState() ?? {};
            const greeting = randomGreeting();
            const jid = ctx?.key?.remoteJid;
            myState[ctx.from] = {...myState[ctx.from], on: false};
            console.log(chalk.bgCyan("BOT APAGADO -> "), chalk.cyan(JSON.stringify(myState)));
            //await provider.vendor.readMessages([ctx?.key]);
            await provider.vendor.presenceSubscribe(jid);
            await extensions.utils.wait(setRandomDelay(750,550));
            await provider.vendor.sendPresenceUpdate("composing", jid);
            await extensions.utils.wait(setRandomDelay(1250,850));
            await provider.vendor.sendMessage(jid, {text: `${greeting[Math.floor(Math.random() * greeting.length)]} 💁🏻‍♀️ Digame en que puedo ayudarle`});
            await provider.vendor.sendPresenceUpdate("paused", jid);
        } catch (e) {
            await postSlack({
                text: `Error en el FLOW advisorFlow: ${e.message}`
            });
            console.error(chalk.bgRed("Error en el flujo timeoutFlow"), e.message)
        }
    });


module.exports = {advisorFlow};