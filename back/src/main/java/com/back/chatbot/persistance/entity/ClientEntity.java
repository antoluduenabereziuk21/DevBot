package com.back.chatbot.persistance.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UuidGenerator;
@Entity
@Data
public class ClientEntity {

    @Id
    @UuidGenerator
    private String idClient;

    @Column(name = "name", nullable = true, length = 85)
    private String name;

    @Column(name = "last_name", nullable = true, length = 85)
    private String last_name;

    @Column(name = "cel_phone", nullable = true, length = 85)
    private String cel_phone;

    @Column(name = "address", nullable = true, length = 85)
    private String address;

    @Column(name = "reference", nullable = true, length = 150)
    private String reference;

    @Column(name = "locality", nullable = true, length = 85)
    private String locality;

    @Column(name = "email", nullable =true, length = 85)
    private String email;
}
/*
//post create cliente cell .....nulll, cliente:{
name:"",
}
nombre
apellido
celular
domicilio
referencia
Localidad
email,

Atributos cliente  peru/departamentos/provincia/distrito Localidad/ codigoPostal
* */