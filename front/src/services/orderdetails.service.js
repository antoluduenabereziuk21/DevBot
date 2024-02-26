//const { downloadMediaMessage } = require('@whiskeysockets/baileys');
//const fs = require('node:fs/promises');
const getOrderWA = async (orderId, orderToken, provider, ctx) => {
    try {
        const orderToken = ctx?.message?.orderMessage.token;
        const orderNumber = ctx?.message?.orderMessage.orderId;
        const customerJid = ctx?.key.remoteJid;
        const status = ctx?.message?.orderMessage.status;

        let order = await provider.getOrder(orderId, orderToken);
        const orderTotal = order.price.total / 1000;
        const orderData = order.products;
        const orderTumbnail= ctx?.message?.orderMessage.thumbnail
        let nextData = orderData
            .map(({ name, price, quantity }) => `${name} x${quantity} @ PEN S/.${price / 1000}= S/${quantity*(price/1000)}`)
            .join("\n");

        let orderConfirm = `Order Number: ${orderId}\n\nOrder Details: \n${nextData} \n\nOrder Total: PEN= S/.${orderTotal} \n\nestado :${status}  \n\nResponda con la palabra *cancelar* o *iniciar* para continuar con su pedido`;

        await provider.sendText(customerJid, orderConfirm);

        return { orderToken, orderNumber, customerJid, nextData, orderTotal };
    } catch (error) {
        return 'FAIL: obtener detalles orden';
    }
};

module.exports = { getOrderWA };

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