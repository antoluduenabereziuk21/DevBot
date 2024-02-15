package com.back.chatbot.service;

import com.back.chatbot.controller.dto.response.ClientResponseDTO;
import com.back.chatbot.persistance.entity.ClientEntity;

import java.util.List;

public interface IClientService {
    List<ClientResponseDTO> getAllClients();

    ClientResponseDTO getClientById(String idClient);

    ClientEntity createClient(ClientEntity clientEntity);
}
