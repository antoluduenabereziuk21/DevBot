package com.back.chatbot.service;

import com.back.chatbot.persistance.entity.ClientEntity;

import java.util.List;

public interface IClientService {
    List<ClientEntity> getAllClients();

    ClientEntity getClientById(String idClient);

    ClientEntity createClient(ClientEntity clientEntity);
}
