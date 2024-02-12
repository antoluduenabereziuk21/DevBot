const axios = require('axios').default;

const {addKeyword} = require('@bot-whatsapp/bot')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const API_URL = 'http://localhost:9698/v1/api/customers/new'

const saveClient = (dataEntry) => {
    
    var config = {
        method: "post",    
        url:API_URL,
        headers: {
            'Content-Type': 'application/json'
          },
        data: dataEntry,
    };
    
    axios(config)
        .then(function (response){
            console.log(JSON.stringify(response.data));
    })
    .catch(function(error){
        console.log(error);
    })
};

let GLOBAL_CLIENT = {}

module.exports = addKeyword('RESGISTRO_USAURIO')
.addAnswer('Puedes decirme tu nombre', {capture:true},       
            async(ctx)=>{
                GLOBAL_CLIENT[ctx.from] = {
                    "nombre": ctx.body,
                    "celular":ctx.from,
                    "direccion": "",
                    "referencia":""
                }
                console.log(`nombre cliente ${ctx.body}`)
            })

        .addAnswer('Puedes decirme tu direccion',{capture:true}, 
            async(ctx)=>{
                GLOBAL_CLIENT[ctx.from].direccion = ctx.body
            }

        )
        .addAnswer(['Me darias alguna referencia de tu casa',
                    'ejemplo : Mi casa es color Verde'], 
            {capture:true}, 
            async(ctx)=> {
                GLOBAL_CLIENT[ctx.from].referencia = ctx.body
            }

        )
        .addAnswer('Gracias por tus datos',null, async (ctx,{flowDynamic}) => {
            saveClient(GLOBAL_CLIENT[ctx.from])
            await flowDynamic(`Muy bien ${GLOBAL_CLIENT[ctx.from].nombre} seguimos con el medio de pago`)
        })