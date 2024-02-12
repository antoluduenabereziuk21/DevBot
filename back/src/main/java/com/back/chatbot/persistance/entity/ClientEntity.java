package com.back.chatbot.persistance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
@Entity
@Data
public class ClientEntity {

    @Id
    @UuidGenerator
    private String idClient;

    private String name;

    private String email;
}
