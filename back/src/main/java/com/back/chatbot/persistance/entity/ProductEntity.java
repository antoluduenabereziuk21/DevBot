package com.back.chatbot.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
@Entity
@Data
public class ProductEntity {

    @Id
    @UuidGenerator
    private String idProduct;

    private String description;

    private String price;
}
