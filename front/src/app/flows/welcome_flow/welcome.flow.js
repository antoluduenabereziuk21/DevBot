const { addKeyword ,EVENTS} = require("@bot-whatsapp/bot");
const { randomGreeting } = require("../../../utils/greeting.util");
const { setRandomDelay } = require("../../../utils/delay.util");
const {postSlack} = require("../../../http/slack.http");
const ENV = require("../../../utils/enviroments.util");
const chalk = require("chalk");
const {idleStart, idleReset, idleStop} = require("../../../utils/idle.util");
const {advisorFlow} = require("../advisor_flow/advisor.flow");
const userstateMiddleware = require("../../../middlewares/userstate.middleware");

const REGEX_ADVISOR = "/^#(asesor)$/";
const REGEX_KEYWORD = "/^#(empezar)$/";

const {URL_WHATSAPP}= ENV();
const greeting = randomGreeting();

//2° Dependiedo lo que escriba el usuario dentro de las palabras claves se ejecuta un flujo (#empezar o #asesor)
const offFlow = addKeyword(REGEX_ADVISOR, {regex: true}).addAction(async (ctx, {
  extensions,
  state,
  provider,
  gotoFlow
}) => {
  try {
    const jid = ctx?.key?.remoteJid;
    const myState = state.getMyState() ?? {};
    myState[ctx.from] = {...myState[ctx.from], on: false};
    await state.update(myState);
    console.log(chalk.bgCyan("BOT APAGADO -> "), chalk.cyan(JSON.stringify(myState)));
    await provider.vendor.sendMessage(jid, {react: {key: ctx?.key, text: "✅"}});
    await extensions.utils.wait(500);
    await provider.vendor.sendMessage(jid, {text: "En unos instantes el asesor se comunicará con usted..."}, {quoted: ctx});
    return gotoFlow(advisorFlow);
  } catch (error) {
    await postSlack({text: `[ERROR FLUJO offFlow:]`+error})
    console.error(chalk.bgRed("ERROR FLUJO offFlow"), error);
  }
});

const onFlow = addKeyword(REGEX_KEYWORD, {regex: true})
    .addAction(async (ctx, {provider, gotoFlow, state}) => {
      try {
        const jid = ctx?.key?.remoteJid;
        const key = ctx?.key;
        const myState = state.getMyState() ?? {};
        myState[ctx.from] = {...myState[ctx.from], on: true};
        await state.update(myState);

        await provider.vendor.readMessages([key]);
        await provider.vendor.sendMessage(jid, {react: {key, text: "⏳"}});

        console.log(chalk.bgCyan("BOT ENCENDIDO-> "), chalk.cyan(JSON.stringify(myState)));
        return gotoFlow(flowPrincipal);
      } catch (error) {
        console.error(chalk.bgRed("ERROR FLUJO onFlow"), error);
        await postSlack({text: `[ERROR FLUJO ONFLOW:]`+error})
      }
    });

/**
 * 1° Se ejecuta el flujo principal
 */
const flowPrincipal = addKeyword(EVENTS.WELCOME, {})
    .addAction(userstateMiddleware)
    .addAction(async (ctx, {gotoFlow, globalState,extensions,provider}) => {
      idleStart(ctx, gotoFlow, globalState.getMyState().timer);
      await provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "✅"}});
    })
  .addAction(async (ctx, { provider, flowDynamic, extensions }) => {
      await extensions.utils.typing(provider, {
        delay1: setRandomDelay(800, 550),
        delay2: setRandomDelay(2950, 1850),
        ctx
      })
       await flowDynamic([{
        body: `💬 ${greeting[Math.floor(Math.random() * greeting.length)]} , bienvenido a nuestro *restobar* \nPara pedir tus antojos 🍔 ,abre nuestro catalogo 😉`,
        media: "https://ik.imagekit.io/ljpa/zephyr-cygnus/imgBot/ia6.jpg"
      }]);
      await provider.vendor.sendPresenceUpdate("paused", ctx?.key?.remoteJid);
    }
  )
  .addAction(async (ctx, { provider, extensions, gotoFlow, globalState }) => {
    try {
      //idleReset(ctx, gotoFlow, globalState.getMyState().timer);
      const jid = ctx?.key?.remoteJid;

      await extensions.utils.typing(provider, {
        delay1: setRandomDelay(800, 500),
        delay2: setRandomDelay(3000, 2500),
        ctx,
      });

      await provider.vendor.sendMessage(jid, {
        text: "Presioname 👇🏼",
        contextInfo: {
          externalAdReply: {
            title: "Catalogo Zephyr Cygnus",
            body: "Restobar club",
            mediaType: "VIDEO",
            showAdAttribution: true,
            mediaUrl: URL_WHATSAPP,
            thumbnailUrl: "https://ik.imagekit.io/ljpa/zephyr-cygnus/products/friedfood/chicharra.jpg",
            sourceUrl: URL_WHATSAPP,
          },
        },
      });

      await provider.vendor.sendPresenceUpdate("paused", jid);
    } catch (e) {
      idleStop(ctx)
      console.error(`Error flowPrincipal -> ${e.message}`);
      await postSlack({text: `Error en flowPrincipal: ${e.message}`})
    }
  });

module.exports = {flowPrincipal, onFlow, offFlow};
