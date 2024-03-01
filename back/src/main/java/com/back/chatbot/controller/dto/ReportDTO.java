package com.back.chatbot.controller.dto;

import lombok.Data;

import java.io.ByteArrayInputStream;
@Data
public class ReportDTO {
    private String fileName;
    private ByteArrayInputStream stream;
    private int length;



}

