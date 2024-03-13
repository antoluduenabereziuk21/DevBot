package com.back.chatbot.controller.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class ItemsOrderRequestDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "Debe Ingresar El Id Del Item ")
    @NotBlank(message = "no debe consistir solo en espacios en blanco")
    @Schema(description = "El Id Del Item", example = "a1sd54asd")
    private String idItemWA;//exe

    @NotEmpty(message = "Debe Ingresar El Nombre Del Producto")
    @NotBlank(message = "no debe consistir solo en espacios en blanco")
    @Schema(description = "Nombre Del Producto", example = "Pizza ala Napolitana")
    private String name;

    @Schema(description = "Cantidad de Items Solcitados", example = "2")
    private Integer quantity;

    @Min(value = 0, message = "El monto debe ser mayor a 0")
    @Schema(description = "Monto a individual del Items", example = "150.5")
    private BigDecimal price;

    @Pattern(regexp = "^[a-zA-ZÑñ ]+$", message = "No se permite carácteres especiales y números.")
    @Schema(description = "Descripcion del Items", example = "Delciosa Hamburguesa Doble")
    private String description;
    private String idOrder;
}
