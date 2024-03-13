package com.back.chatbot.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemsOrderEntity {
    @Id
    @UuidGenerator
    private String idItem;

    private String idItemWA;

    private String name;

    private Integer quantity;

    private BigDecimal price;

    private String description;

    @ManyToOne
    @JoinColumn(name = "idOrder")
    private OrderEntity orderEntity;


}
