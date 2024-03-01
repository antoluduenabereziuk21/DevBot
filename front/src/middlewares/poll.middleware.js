const {idleReset, idleStop} = require("../utils/idle.util");
const {setRandomDelay} = require("../utils/delay.util");
const {red} = require("chalk");
const {postSlack} = require("../http/slack.http");


const pollMiddleware =async (ctx, {gotoFlow, provider, globalState, extensions, endFlow, state}) => {
    try {
        idleReset(ctx, gotoFlow, globalState.getMyState().timer);
        const jid = ctx?.key?.remoteJid;
        const myState = state.getMyState();
        console.log(`ESTADO DEL FLUJO ${pollMiddleware.name}`, myState);
        if (ctx?.type !== 'poll') {
            await extensions.utils.typing(provider, {
                delay1: setRandomDelay(800, 560),
                delay2: setRandomDelay(1850, 1450),
                ctx
            });
            idleStop(ctx);
            return endFlow("💢 Debe elegir una de las opciones válidas, se cierra sesión");
        }
        await provider.vendor.sendPresenceUpdate("paused", jid);
        idleStop(ctx);
        await extensions.utils.wait(setRandomDelay(850, 760));
        await provider.vendor.sendMessage(jid, {delete: ctx?.key})
        await extensions.utils.wait(setRandomDelay(800, 560));
    } catch (e) {
        idleStop(ctx);
        console.log(red.bold(`[PASO POLL ${pollMiddleware.name}:]`), e.message);
        await postSlack({text: `[PASO POLL ${pollMiddleware.name}:]`+e.message})
    }
}

module.exports = pollMiddleware