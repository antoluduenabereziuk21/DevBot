const {addKeyword ,EVENTS} = require('@bot-whatsapp/bot')
const {randomGreeting} = require('../../../utils/greeting.util')
const {setRandomDelay} = require('../../../utils/delay.util')

const greeting = randomGreeting();

const flowPrincipal = addKeyword(['hola', 'ole', 'alo','buenas','buenas tardes'],{})
    .addAnswer(`💬 ${greeting[Math.floor(Math.random()*greeting.length)]} , bienvenido a nuestro *restobar*`
        , {media: "https://ik.imagekit.io/ljpa/zephyr-cygnus/imgBot/ia6.jpg", delay: setRandomDelay(1800,1500)}
        ,null
    )
    .addAction(async(ctx,{provider, flowDynamic, extensions})=>{
        //Le enviamos la plantilla del catalago
        // luego esperamos a que escoja llos productos y procesamos
        const jid = ctx?.key?.remoteJid;
        const key = ctx?.key;
        const phone= ctx?.from;

        await extensions.utils.typing(provider,{
            delay1:setRandomDelay(800,500),
            delay2:setRandomDelay(3000,2500), 
            ctx
        })
        await flowDynamic("Para pedir tus antojos 🍔 , abre nuestro catalogo 😉")

        await provider.vendor.sendPresenceUpdate("paused", jid);

        await extensions.utils.wait(setRandomDelay(1200,950))
        
        await provider.vendor.sendMessage(jid, {
            text: "Presioname 👇🏼",
            contextInfo: {
              externalAdReply: {
                title: "Catalogo Zephyr Cygnus",
                body: "Restobar club",
                mediaType: "VIDEO",
                showAdAttribution: true,
                mediaUrl: "https://wa.me/c/51968036430",
                thumbnailUrl: "https://ik.imagekit.io/ljpa/zephyr-cygnus/products/friedfood/chicharra.jpg",
                sourceUrl: "https://wa.me/c/51968036430",
              },
            },
          });
    });

module.exports=flowPrincipal

