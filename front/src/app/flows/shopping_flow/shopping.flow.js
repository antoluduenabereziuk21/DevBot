const { addKeyword ,EVENTS} = require('@bot-whatsapp/bot')
const {getOrderWA} = require('../../../services/orderdetails.service')

const catalogFlow = addKeyword(EVENTS.ORDER,{})
    .addAction(async (ctx, { provider }) => {
        let oId = ctx.message.orderMessage.orderId;
        let oToken = ctx.message.orderMessage.token;
        const respondeWA = await getOrderWA(oId, oToken, provider, ctx);

        console.log(respondeWA);
    });

module.exports = catalogFlow;