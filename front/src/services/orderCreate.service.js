
const ORDEN = require('../utils/constants.util');
const createClientWA = require('./clientCreate.service');

/**
 * @Description Función para crear un pedido en WhatsApp en base al carrito de compras 
 * @param {String} orderId - ID del pedido
 * @param {String} orderToken - Token del pedido
 * @param {Object} provider - Instancia del proveedor//traer el ctxFn en vez de provider
 * @param {Boolean} delivery - Indica si el pedido tiene costo de envío
 */
const createOrderWA = async(orderId,orderToken,ctxFn, delivery=false)=>{

    let order = await ctxFn.provider.getOrder(orderId, orderToken)
  
    const orderTotal = delivery ? order.price.total / 1000 + ORDEN.DELIVERY_COST :order.price.total / 1000;
    const total1000= order.price.total;
    const currency = order.price.currency;
    const orderData = order.products;
  
        let GLOBAL_ORDER = {
            "idOrderWA": orderId,
            "itemsProducts": [], // Inicializar como un array vacío
            "total": orderTotal,
            "delivery": delivery,
        }

        // Recorrer los elementos en orderData.products
        for (let i = 0; i < orderData.length; i++) {
            // Crear un nuevo objeto para cada producto y agregarlo a itemsProducts
            let itemProduct = {
                "idItemWA": orderData[i].id,
                "description": orderData[i].name,
                "name": orderData[i].name,
                "quantity": orderData[i].quantity,
                //TODO priceFinal = (orderData[i].price) /1000
                "price": (orderData[i].price)/1000
            }

            // Agregar el nuevo objeto al array itemsProducts
            GLOBAL_ORDER.itemsProducts.push(itemProduct);
        }
        
        // Resultado final
        console.log("GLOBAL ORDER WA ",GLOBAL_ORDER);

        return GLOBAL_ORDER;
}

module.exports = createOrderWA;