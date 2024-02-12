const {addKeyword} = require('@bot-whatsapp/bot');
const flowRegister = require('./flowRegister');

module.exports = addKeyword('USUARIO_NO_REGISTRADO').
    addAnswer(['Selecciona la opcion de tu preferencia',
              'respondiendo con el numero correspodiente a cada producto',
              '*1* 🥙  Arepas',
              '*2* 🌮  Tacos',
              '*3* 🍕  Pizza',
              '*4* 🥪  Lomos'],
              {capture:true},
              async(ctx,{fallBack})=>{
                /*podemos usar este condicional o bien el de abajo
                if(ctx.body !== '1' || ctx.body !== '2' ||ctx.body !== '3'){
                    return fallBack()
                }En caso de que no se reponda correctamente*/
                if(!['1','2','3','4'].includes(ctx.body)){
                    return fallBack('Esa opcion no es valida 🤦‍♂️ ')
                }
                console.log(`El cliente respondio ${ctx.body}`)
            }
    )
    .addAnswer(['Hemos tomado tu pedido. 😋 '],
    null,
    async(ctx,{flowDynamic,gotoFlow})=>{
        await flowDynamic('A continuacion te pediremos tus datos para el envio 📝 ');
        return gotoFlow(flowRegister);
    })
    