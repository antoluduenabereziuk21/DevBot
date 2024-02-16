package com.back.chatbot.controller.dto.request;

import com.back.chatbot.enums.OrderState;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
@Data
public class OrderRequestDto {

    private String idOrder;

    //@Enumerated(value = EnumType.STRING)
    private OrderState orderState;
    private List<ItemsOrderRequestDto> itemsProducts;
    private BigDecimal total;

    public OrderRequestDto(){
    itemsProducts = new ArrayList<>();
    }

}
