const chalk = require('chalk');

/**
 * Create a client object with the data of the user
 * @param {Object} ctx - Contexto de la conversación del usuario
 * @param {Object} ctxFn - Objeto que tiene las funciones de {flowDnamic, gotoFlow,etc}
 * @param {Boolean} delivery - Delivery, opción booleana para saber si es un delivery
 */
const createClientWA = async(ctx,ctxFn,delivery=false)=>{
    let myState = ctxFn.state.getMyState();

    const wa= myState[ctx?.from];
    
    console.log(chalk.red("Me llega este nombre:"), wa.data.name);
    if(delivery){
        
        const GLOBAL_CLIENT= {
            client:{
                "name":wa.data.name || "a",
                "last_name":wa.data.last_name || "b",
                "cel_phone":wa.data.cel_phone || "c",
                "address":wa.data.address || "d",
                "reference":wa.data.reference || "e",
                "locality":"",
                "email":""
            }
        }
        console.log(chalk.blue("GLOBAL_CLIENT_DELIVERY"),GLOBAL_CLIENT);
        return GLOBAL_CLIENT
    }else{
        const GLOBAL_CLIENT= {
            client:{
                "name":"",
                "last_name":"",
                "cel_phone":wa.data.cel_phone,
                "address":"",
                "reference":"",
                "locality":"",
                "email":""
            }    
        }
        console.log(chalk.blue("GLOBAL_CLIENT"),GLOBAL_CLIENT);

        return GLOBAL_CLIENT
    }
   
}

module.exports = createClientWA;