const ORDEN = require('../utils/constants.util');

/**
 * @description Procesar la orden para enviarla por WhatsApp en un template
 * @param {string} orderId
 * @param {string} orderToken
 * @param {Provider} provider
 * @param {Context} ctx
 * @param {boolean} delivery
 */
const processOrderWA = async (orderId, orderToken, provider, ctx, delivery=false) => {
    //delivery sea un booleano
    try {
        let order = await provider.getOrder(orderId, orderToken);

        const orderTotal = delivery ? order.price.total / 1000 + ORDEN.DELIVERY_COST :order.price.total / 1000;
        const total1000= order.price.total;
        const currency = order.price.currency;
        const orderData = order.products;
      
        let nextData = orderData
        //ordernar los puntos entre la modea y el simbolo de $
            .map(({ name, price, quantity }) => `${name} x${quantity} $ ${price / 1000}= ${currency} $ ${quantity*(price/1000)}`)
            .join("\n");

        let orderConfirm = `*Order Number:* ${orderId}\n\n*Order Detalles:* \n${nextData} \n\n*Order Total:* *$ ${orderTotal}*`;

        return { orderConfirm,currency , total1000};
    } catch (error) {
        return 'FAIL: obtener detalles orden';
    }
};

module.exports = { processOrderWA };

/*const orderCount= ctx?.message?.orderMessage.itemCount;
  const totalx1000= ctx?.message?.orderMessage.totalAmount1000;
  const orderTitle= ctx?.message?.orderMessage.orderTitle;
  const orderPrice= order.price.currency //moneda Actual
  //const orderImage= order.products.imageUrl;
  //console.log(orderCount,totalx1000,orderTitle,orderPrice,orderImage[0]);
  PARA SABER SI ME ESCRIBE DESDE ANDROID
  const android = await getDevice(customerJid);
  console.log(android);
  */