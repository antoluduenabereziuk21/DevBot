package com.back.chatbot.controller.dto.request;

import lombok.Builder;

import java.io.Serial;
import java.io.Serializable;

@Builder
public class ClientRequestDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private String last_name;
    private String cel_phone;
    private String address;
    private String reference;
    private String locality;
    private String email;


}
