package com.back.chatbot.controller.dto.response;

import com.back.chatbot.persistance.entity.ItemsOrderEntity;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class OrderResponseReportDTO {
    private String idOrderWA;
    private BigDecimal total;
    private String name;
    private Integer quantity;
    private BigDecimal price;

    private String nameClient;
    private String cellPhone;
    private String address;
    private String dateReport;

    public OrderResponseReportDTO() {

        LocalDateTime lDate = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

        dateReport = lDate.format(formatter);

    }
}
