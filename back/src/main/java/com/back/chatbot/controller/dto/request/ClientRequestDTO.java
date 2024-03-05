package com.back.chatbot.controller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.io.Serial;
import java.io.Serializable;

@Builder
public class ClientRequestDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "Debe Ingresar El Nombre")
    @NotBlank(message = "no debe consistir solo en espacios en blanco")
    @Schema(description = "Nombre Cliente", example = "John")
    private String name;

    @NotEmpty(message = "Debe Ingresar El Apellido")
    @NotBlank(message = "no debe consistir solo en espacios en blanco")
    @Schema(description = "Apellido Cliente", example = "Doe")
    private String last_name;

    @NotEmpty(message = "Debe Ingresar El Numero de Celular")
    @NotBlank(message = "no debe consistir solo en espacios en blanco")
    @Schema(description = "Numero Celular", example = "+54152474747")
    private String cel_phone;

    @NotEmpty(message = "Debe Ingresar La Direccion")
    @NotBlank(message = "no debe consistir solo en espacios en blanco")
    @Schema(description = "Direccion", example = "Calle Alegre 234")
    private String address;

    @NotEmpty(message = "Debe Ingresar Una Referencia")
    @NotBlank(message = "no debe consistir solo en espacios en blanco")
    @Schema(description = "Referencia", example = "frente a la plaza")
    private String reference;

    @NotEmpty(message = "Debe Ingresar Una Localidad")
    @NotBlank(message = "no debe consistir solo en espacios en blanco")
    @Schema(description = "Localidad", example = "Capital")
    private String locality;

    @NotEmpty(message = "Debe Ingresar Un Email")
    @Schema(description = "Email", example = "john@doe.net")
    private String email;


}
