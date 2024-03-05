package com.back.chatbot.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;

@Entity
@Data
public class ItemsOrderEntity {
    @Id
    @UuidGenerator
    private String idItem;

    private String idItemWA;

    private String name;

    private BigDecimal quantity;

    private BigDecimal price;

    private String description;

    @ManyToOne
    @JoinColumn(name = "idOrder")
    private OrderEntity orderEntity;


}
