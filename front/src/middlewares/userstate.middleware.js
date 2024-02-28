const chalk = require("chalk");
const {postSlack} = require("../http/slack.http");

const userstateMiddleware= async (ctx, {state,provider,endFlow}) => {
    try {
        const myState= state.getMyState() ?? {};
        const phoneNumber = ctx?.from;
        console.log(chalk.blue.bold(`\nRevisando si ${phoneNumber} está encendido...`));
        await provider.vendor.readMessages([ctx?.key]);

        console.log(chalk.blue.bold("1° Estado del telefono"), phoneNumber, myState[phoneNumber]);

        if (typeof myState[phoneNumber] === "undefined") {
            myState[phoneNumber] = {...myState[phoneNumber], on: true};
            await state.update(myState);
            console.log(chalk.blue.bold("Estado del telefono"), phoneNumber, myState);
        }

        if (!myState[phoneNumber]?.on) {
            console.log(chalk.cyan.bold("BOT APAGADO desde welcomeFlow -> "), chalk.blue.bold(JSON.stringify(myState)));
            return endFlow();
        }

    } catch (error) {
        console.error(chalk.bgRed("ERROR FLUJO welcomeFlow"), error);
        await postSlack({text: `Error en el FLOW welcomeFlow: ${error.message}`})
    }
}

module.exports = userstateMiddleware;