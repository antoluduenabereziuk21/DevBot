package com.back.chatbot.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;

@Entity
@Data
public class OrderEntity {
    @Id
    @UuidGenerator
    private String id;

    private BigDecimal quantity;

    private BigDecimal price;

    private String description;

    private Boolean state;

    private void State(){
        this.state = true;
    }

    /*id
    * cantidad
    * precio
    * descripcion
    * estado*/
}
