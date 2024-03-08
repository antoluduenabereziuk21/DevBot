const {addKeyword} = require('@bot-whatsapp/bot')
const {idleStart} = require("../../../utils/idle.util");
const {setRandomDelay} = require("../../../utils/delay.util");
const chalk = require('chalk');
const {postSlack} = require("../../../http/slack.http");
const { processOrderWA } = require('../../../services/orderdetails.service');
const { createOrder } = require('../../../http/order.http');
const REGEX_KEYWORD = "/Recojo en tienda/g";

const localpickupFlow = addKeyword(REGEX_KEYWORD, {regex: true})
    .addAction(async (ctx, {globalState, gotoFlow, provider}) => {
        idleStart(ctx, gotoFlow, globalState.getMyState().timer);
        await provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "🤩"}});
    })
    .addAnswer("😉 Sirvase pasar a nuestro local, inmediatamente le enviaremos nuestra *dirección 🏠 y su comprobante 📄* 💁🏻‍♀️"
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
    )
    .addAction(async (ctx, {provider, extensions, endFlow, state}) => {
        //AQUI GENERAMOS EL COMPROBANTE DE COMPRA Y LO ENVIAMOS AL USUARIO
        try{ 
            const myState = state.getMyState();
            const {order} = await state.get(ctx?.from)
            const {getOrderWa} = await processOrderWA(order.idOrder,order.tokenOrder,provider,ctx)
            //nos debe retornar el pdf la api
            const bytePdf= await createOrder(getOrderWa.GLOBAL_ORDER);
            console.log(chalk.blue("Pdf y orden generados"),bytePdf);
            idleStop(ctx);
            return endFlow("Gracias por su compra, recuerda si deseas pedir algo más, no dudes en escribir *#empezar*. 😊")
        }catch (error){
            console.error(bgRed("ERROR FLUJO localpickupFlow"), error);
            await postSlack({text: `[ERROR FLUJO localpickupFlow:]` + error})
        }finally {
            await state.clear(ctx?.from);
            myState = Object.assign({}, myState);
        }
    })

module.exports = localpickupFlow
