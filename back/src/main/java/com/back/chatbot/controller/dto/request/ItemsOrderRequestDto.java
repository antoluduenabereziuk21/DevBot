package com.back.chatbot.controller.dto.request;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ItemsOrderRequestDto {

    //private String idItem;
    private BigDecimal quantity;
    private BigDecimal price;
    private String description;
    private String idOrder;
}
