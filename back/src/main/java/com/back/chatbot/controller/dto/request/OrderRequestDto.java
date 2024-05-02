package com.back.chatbot.controller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
@Data
public class OrderRequestDto {

    @Schema(description = "Objeto Cliente")
    private ClientRequestDTO client;

    @Schema(description = "ID WA", example = "9854896326")
    private String idOrderWA;

    @Schema(description = "Listado Items", example = "idItemWA: a2sd13a1s3e,name: Hamburguesa Americana, quantity: 1, " + "price: 300, description: Hamburguesa Americana")
    private List<ItemsOrderRequestDto> itemsProducts;

    @Schema(description = "Toltal Orden", example = "45986.00")
    private BigDecimal total;

    private boolean delivery;

    public OrderRequestDto(){
    itemsProducts = new ArrayList<>();
    }

}
/*Object Order From WA
//ctx.orderMessage.orderId-> setear A orderIdWA,
orderMessage: OrderMessage {
      orderId: '1404031393832865',
      thumbnail: [Uint8Array],
      itemCount: 3,
//ItemsProducts
{
  price: { total: 139000, currency: 'PEN' },
  products: [
    {
      id: '7018330914956051',
      name: 'Pizza Especial Americana',
      imageUrl: 'https://media-iad3-1.cdn.whatsapp.net/v/t45.5328-4/424791837_7387237097993381_176655552955010082_n.jpg?stp=dst-jpg_p100x100&ccb=1-7&_nc_sid=2
e34ca&_nc_ohc=mVGwqGgpwbwAX9bNyOP&_nc_ad=z-m&_nc_cid=0&_nc_ht=media-iad3-1.cdn.whatsapp.net&oh=01_AdSKiahuimcrxle-sNepzY1N9S7g2425HGVgfC3T3SUoXg&oe=65D52033',
      price: 45500,
      currency: 'PEN',
      quantity: 1
    },
    {
      id: '24723560527290144',
      id: '6980362552054053',
      name: 'Pizza Tradicional',
      imageUrl: 'https://media-iad3-1.cdn.whatsapp.net/v/t45.5328-4/426428694_6583958785037772_8362108922683338010_n.jpg?stp=dst-jpg_p100x100&ccb=1-7&_nc_sid=
2e34ca&_nc_ohc=VlpeZgL6GLAAX8OQ-IU&_nc_ad=z-m&_nc_cid=0&_nc_ht=media-iad3-1.cdn.whatsapp.net&oh=01_AdQzWLLLcDIGu0nIdxVPE0UzpBpEaAlIOqdRFhjtlgE_Vw&oe=65D53CD7'
,
      price: 47900,
      currency: 'PEN',
      quantity: 1
    }
  ]
}
* */
