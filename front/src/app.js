const { createBot, createProvider, createFlow, addKeyword ,EVENTS} = require('@bot-whatsapp/bot')
const axios = require('axios').default;
const QRPortalWeb = require('@gilmour-plant/portal-qr')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const {randomGreeting} = require('./utils/greeting.util')
const { flowClient, flowNoClient ,flowRegister, catalogFlow, flowPrincipal} = require('./app/flows');
const newInstance = require('../src/helpers/helper.class')
//const {API_URL} = require('process.env')

//const config = require('./config.js')


//const API_URL = 'http://localhost:9698/v1/api/customers/'
//console.log(API_URL)


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

    const settings={
        extensions: {
            utils: newInstance,
        },
        globalState: {
            timer: 300000, //300000 -> 5 minutos
        }
    }

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },settings)

    QRPortalWeb()
}

main()
