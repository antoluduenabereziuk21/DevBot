const chalk = require("chalk");
const {idleStop} = require("../../../../utils/idle.util");
const {logoutFlow} = require("../../exit_flow/exit.flow");
const {OptionNotValidException} = require("../../../../exceptions/handler.class");
const {orderFlow} = require("../../order_flow/order.flow");
const {setRandomDelay} = require("../../../../utils/delay.util")

class Strategy{
    constructor(){
        if (!Strategy.instance) {
            Strategy.instance = this;
        }
        return Strategy.instance;
    }

    case_1 = async (ctx, ctxFn) =>{
        console.log(chalk.green.bold("case_1, escribio opcion 1"));
        idleStop(ctx);
        await ctxFn.extensions.utils.wait(setRandomDelay(1350, 850));
        await ctxFn.provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "🍔"}});
        return ctxFn.gotoFlow(orderFlow);
    }

    case_2 = async (ctx,ctxFn) =>{
        console.log(chalk.green.bold("case_2, escribio opcion 2"));
        idleStop(ctx);
        await ctxFn.extensions.utils.wait(setRandomDelay(1350, 850));
        await ctxFn.provider.vendor.sendMessage(ctx?.key?.remoteJid, {react: {key: ctx?.key, text: "😱"}});
        return ctxFn.gotoFlow(logoutFlow);
    }

    default= ()=> {
        idleStop(ctx);
        console.error("Error en menuOptions");
        throw new OptionNotValidException("Opción no válida");
    }
}
const strategy = new Strategy();
module.exports = strategy
