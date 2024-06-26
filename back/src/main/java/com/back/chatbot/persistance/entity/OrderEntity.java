package com.back.chatbot.persistance.entity;

import com.back.chatbot.enums.OrderState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    @Id
    @UuidGenerator
    private String idOrder;
    //id from WA for order
    private String idOrderWA;

    @Enumerated(value = EnumType.STRING)
    private OrderState orderState;

    @OneToMany(mappedBy = "orderEntity", cascade = CascadeType.PERSIST)
    private List<ItemsOrderEntity> itemsProducts;

    private BigDecimal total;


}
