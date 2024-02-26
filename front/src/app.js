const { createBot, createProvider, createFlow, addKeyword ,EVENTS} = require('@bot-whatsapp/bot')
const axios = require('axios').default;
const QRPortalWeb = require('@gilmour-plant/portal-qr')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const { flowClient, flowNoClient ,flowRegister, catalogFlow} = require('./app/flows');
//const {API_URL} = require('process.env')

//const config = require('./config.js')


const API_URL = 'http://localhost:9698/v1/api/customers/'
console.log(API_URL)


const flowPrincipal = addKeyword(['hola', 'ole', 'alo'],{})

    .addAnswer('🙌 Hola bienvenido a este *Chatbot* 🤖 ' 
        , null
        ,async (ctx, { flowDynamic, gotoFlow }) => {
            try {
                let phone = ctx.from;
                console.log(ctx.from + " " + "nombre :" + ctx.pushName);
        
                const resp = await axios(API_URL + `${phone}`);//data de la api, estp habria que usar state
                console.log(resp.status);
        
                if (resp.status === 200) {
                    let name = resp.data.data.nombre;
                    console.log(resp.data.message);
                    await flowDynamic(`Hola!!! ${name}, Este es el menu del Dia 🙂 🍕 `);
                    return gotoFlow(flowClient);
                } else if (resp.status === 404) {
                    // Usuario no encontrado, ir al flujo correspondiente
                    await flowDynamic('Hola!!!, te compartimos el menu del dia 🙂 🍕  ');
                    return gotoFlow(flowNoClient);
                } else {
                    // Otro código de estado, manejar según tus necesidades
                    console.error('Respuesta inesperada de la API:', resp.status);
                    await flowDynamic('Ha ocurrido un error al procesar la solicitud.');
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
                    // Manejar el caso específico de usuario no encontrado
                    console.log("Usuario no encontrado");
                    await flowDynamic('Hola!!!, te compartimos el menu del dia 🙂 🍕  ');
                    return gotoFlow(flowNoClient);
                } else {
                    // Otros errores
                    console.error("Error al realizar la petición:", error);
            
                    // Manejo de error general
                    await flowDynamic('Ha ocurrido un error al procesar la solicitud.');
                }
            }
        }
    );



    const main = async () => {
    const adapterDB = new JsonFileAdapter()

    const flows = [flowPrincipal,
            flowClient,
            flowNoClient,
            flowRegister,
            catalogFlow
        ]

    const adapterFlow = createFlow([...flows])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
