package com.back.chatbot.controller.dto.response;

import com.back.chatbot.controller.dto.request.ItemsOrderRequestDto;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
@Data
public class OrderResponseReport {
    private String idOrderWA;
    private BigDecimal total;
    private String description;
    private BigDecimal quantity;
    private BigDecimal price;

}
