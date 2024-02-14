package com.back.chatbot.controller.dto.response;

import java.io.Serial;
import java.io.Serializable;

public record ClientResponseDTO(
        String  id,
        String name,
        String last_name,
        String address,
        String reference,
        String locality

        ) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
}
