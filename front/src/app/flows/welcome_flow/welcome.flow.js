const { addKeyword } = require("@bot-whatsapp/bot");
const { randomGreeting } = require("../../../utils/greeting.util");
const { setRandomDelay } = require("../../../utils/delay.util");
const {postSlack} = require("../../../http/slack.http");


const greeting = randomGreeting();

const flowPrincipal = addKeyword(["hola", "ole", "alo", "buenas", "buenas tardes"], {})
  .addAnswer(
    [
      `💬 ${greeting[Math.floor(Math.random() * greeting.length)]} , bienvenido a nuestro *restobar*`,
      `Para pedir tus antojos 🍔 ,abre nuestro catalogo 😉`,
    ],
    { media: "https://ik.imagekit.io/ljpa/zephyr-cygnus/imgBot/ia6.jpg", delay: setRandomDelay(1800, 1500) },
    async (ctx, { provider }) => {
      return provider.vendor.readMessages([ctx.key]);
    }
  )
  .addAction(async (ctx, { provider, extensions }) => {
    try {
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
            mediaUrl: "https://wa.me/c/51979838018",
            thumbnailUrl: "https://ik.imagekit.io/ljpa/zephyr-cygnus/products/friedfood/chicharra.jpg",
            sourceUrl: "https://wa.me/c/51979838018",
          },
        },
      });

      await provider.vendor.sendPresenceUpdate("paused", jid);
    } catch (e) {
      console.error(`Error flowPrincipal -> ${e.message}`);
      await postSlack({text: `Error en flowPrincipal: ${e.message}`})
    }
  });

module.exports = flowPrincipal;
