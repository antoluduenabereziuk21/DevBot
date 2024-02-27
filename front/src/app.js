const {createBot, createProvider, createFlow} = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@gilmour-plant/portal-qr')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const newInstance = require('../src/helpers/helper.class')
require('dotenv').config()
const {writeFileSync} = require("fs");
const {join} = require("path");
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const {sendEmail} = require('./services/resend.service');
dayjs.extend(utc);
dayjs.extend(timezone);
const {flows} = require('./app/flows');

const main = async () => {
    let usePairingCode = process.env.USE_PAIRING_CODE ?? false
    let phoneNumber = process.env.PHONE_NUMBER ?? null
    let flag = 0;

    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([...flows])
    const adapterProvider = createProvider(BaileysProvider,{
        usePairingCode,
        phoneNumber,
        enabledCalls: true,
    })

    const settings = {
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
    }, settings)
    //PARA QUE ME LO ENVIA POR EMAIL
    if (adapterProvider.globalVendorArgs.usePairingCode) {
        adapterProvider.on('require_action', async (code) => {
            let pairingCode = code.instructions[1]?.split(':')[1]?.trim() ?? null;
            if (flag > 1) {
                console.log("Cambiando valores al usePairingCode y phone", "Cambiando a Scanning QR");
                adapterProvider.globalVendorArgs.usePairingCode = false;
                writeFileSync(join(process.cwd(), `bot.otp.json`), JSON.stringify(
                    {
                        pairing: pairingCode,
                        timestamp: dayjs().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss'),
                        usePairingCode: adapterProvider.globalVendorArgs.usePairingCode,
                    }, null, 2));
                adapterProvider.globalVendorArgs.phoneNumber = null;
                return;
            }
            flag++
            writeFileSync(join(process.cwd(), `bot.otp.json`), JSON.stringify(
                {
                    pairing: pairingCode,
                    timestamp: dayjs().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss'),
                    usePairingCode: adapterProvider.globalVendorArgs.usePairingCode,
                }, null, 2));
            await sendEmail(pairingCode);
        });
    }

    QRPortalWeb()
}

main()
