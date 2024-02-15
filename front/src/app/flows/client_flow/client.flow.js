const {addKeyword} = require('@bot-whatsapp/bot')
const axios = require('axios').default;
const API_URL = 'http://localhost:9698/v1/api/customers/'

module.exports = addKeyword('USUARIO_REGISTRADO').
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
                    return fallBack('Esa opcion no es valida')
                }
                console.log(`El cliente respondio ${ctx.body}`)
            }
            )
    .addAnswer('Hemos tomado tu pedido')
    .addAnswer('Solo resta que nos confirmes si tu direccion es',null,
    async(ctx,{flowDynamic})=>{
        let phone = ctx.from
        const resp = await axios(API_URL+`${phone}`)//nuevamente se llama ala api, cuando se podria usar el state 
        await flowDynamic(`${resp.data.data.direccion}  ${resp.data.data.distrito}  ${resp.data.data.referencia}`)
    })
    .addAnswer('Por Favor responde por Si o No ',
    {capture:true},
    async(ctx,{flowDynamic,gotoFLow})=>{
        let phone = ctx.from
        const resp = await axios(API_URL+`${phone}`)//nuevamente otro llamado , cuando se podria usar el state 
        if(ctx.body == 'Si' || ctx.body == 'si'){
            await flowDynamic(`Muy bien ${resp.data.data.nombre} continuemos con el medio de pago`)//todo medio de pago
        }else{
            await flowDynamic(`De acuerdo ${resp.data.data.nombre} me pasas la direccion de envio`)//todo update domicilio api 
        }
    }
    );