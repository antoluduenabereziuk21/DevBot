const fs = require("fs").promises;

class HelpersClass {
    constructor() {
        if (!HelpersClass.instance) {
            HelpersClass.instance = this;
        }
        return HelpersClass.instance;
    }

    /**
     * funcion para generar un pequeño delay dado el tiempo en ms
     * @param ms {number}
     * @returns {Promise<unknown>}
     */
    wait = (ms) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    };

    /**
     * funcion para simular la lectura y escritura de un mensaje
     * @param provider {BaileysProvider}
     * @param options {{delay1: number, delay2: number, ctx: {key: {remoteJid: string}}}}
     * @returns {Promise<void>}
     */
    simulatingReadWrite = async (provider, options) => {
        const {delay1, delay2, ctx} = options;
        const $id = ctx?.key?.remoteJid;
        const $key = ctx?.key;
        // view message
        await provider.vendor.readMessages([$key]);
        await provider.vendor.presenceSubscribe($id);
        await this.wait(delay1);
        // simulare writing
        await provider.vendor.sendPresenceUpdate("composing", $id);
        await this.wait(delay2);
        await provider.vendor.sendPresenceUpdate("paused", $id);
    }


    /**
     * funcion para simular la escritura de un mensaje
     * @param provider
     * @param options
     * @returns {Promise<void>}
     */
    typing = async (provider, options) => {
        const {delay1, delay2, ctx} = options;
        const $id = ctx?.key?.remoteJid;

        await provider.vendor.presenceSubscribe($id);
        await this.wait(delay1);

        await provider.vendor.sendPresenceUpdate("composing", $id);
        await this.wait(delay2);
    }

    typing2= async(provider, options)=>{
        const {delay1, ctx} = options;
        const $id = ctx?.key?.remoteJid;

        await provider.vendor.presenceSubscribe($id);
        await this.wait(delay1);

        await provider.vendor.sendPresenceUpdate("composing", $id);
    }
    /**
     * funcion para simular la grabacion de un mensaje de voz
     * @param provider
     * @param options
     * @returns {Promise<void>}
     */
    simulateRecording = async (provider, options) => {
        const {delay1, ctx} = options;
        const $id = ctx?.key?.remoteJid;
        const $key = ctx?.key;
        await provider.vendor.readMessages([$key]);
        await provider.vendor.presenceSubscribe($id);
        await this.wait(delay1);
        await provider.vendor.sendPresenceUpdate("recording", $id);
    }

    /**
     *
     * @param intents
     * @param ctxFn
     * @param options
     * @returns {Promise<*>}
     */
    tryAgain = async (intents, ctxFn, options) => {
        const {ctx, state} = options;
        if (intents > 0) {
            let msgIntents = intents === 1 ? "Tienes 1 intento." : `Tienes ${intents} intentos.`;
            await this.typing(ctxFn.provider, {
                delay1: this.randomMs(800, 500),
                delay2: this.randomMs(2400, 1850),
                ctx
            });
            await ctxFn.provider.vendor.sendPresenceUpdate("paused", ctx?.key?.remoteJid);
            return ctxFn.fallBack({body: msgIntents});
        } else {
            if (!state[ctx?.from]) {
                state[ctx?.from] = {};
            }
            state[ctx?.from] = {...state[ctx?.from], on: false};
            await this.typing(ctxFn.provider, {
                delay1: this.randomMs(750,550),
                delay2: this.randomMs(2450,1650),
                ctx
            });
            await ctxFn.provider.vendor.sendMessage(ctx?.key?.remoteJid, {text: "❌ Su solicitud ha sido cancelada ❌ , escriba #empezar"}, {quoted: ctx});
            await ctxFn.provider.vendor.sendPresenceUpdate("paused", ctx?.key?.remoteJid);
            return ctxFn.endFlow();
        }
    }

    randomMs= (max,min)=>{
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    /**
     *
     * @param file
     * @param data
     * @returns {Promise<void>}
     */
    writeFile = async (file, data) => {
        new Promise((resolve, reject) => {
            fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
                if (err) reject(err);
                resolve("Successfully Written to File.");
            });
        });
    };

    /**
     *
     * @param file
     * @returns {Promise<any>}
     */
    readFile = async (file) => {
        try {
            const data = await fs.readFile(file, 'utf8');
            return JSON.parse(data);
        } catch (e) {
            console.error("Error al leer el archivo");
        }
    };

    /**
     *
     * @param ctx
     * @param file
     * @returns {Promise<void>}
     */
    existsFile = async (ctx, file) => {
        const template = {
            [ctx?.from]: {
                on: true,
                email: "",
                password: "",
                token: ""
            }
        };
        try {
            await fs.access(file, fs.constants.F_OK);
            //Si el archivo esta vacio se crea un nuevo objeto con el numero de telefono como key y un objeto vacio como value
            const data = await fs.readFile(file, 'utf8');
            if (data.length === 0) {
                console.log("Archivo vacio, llenando archivo")
                await this.writeFile(file, template);
            } else {
                console.log('Contenido del archivo:', JSON.parse(data));
            }
        } catch (e) {
            console.error("El archivo no existe");
            console.log("Creando archivo");
            await fs.writeFile(file, JSON.stringify(template,null,2));
        }
    }
}
const newInstance = new HelpersClass();
Object.freeze(newInstance)

module.exports = newInstance;
