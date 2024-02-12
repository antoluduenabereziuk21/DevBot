package com.back.chatbot.service.impl;

import com.back.chatbot.persistance.entity.ClientEntity;
import com.back.chatbot.persistance.repository.IClientRepository;
import com.back.chatbot.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements IClientService {

    @Autowired
    private IClientRepository clientRepository;
    @Override
    public List<ClientEntity> getAllClients() {

        List<ClientEntity> clientList = clientRepository.findAll();

        return clientList;
    }

    @Override
    public ClientEntity getClientById(String idClient) {

        ClientEntity client = clientRepository.findById(idClient).orElseThrow();

        return client;
    }

    @Override
    public ClientEntity createClient(ClientEntity clientEntity) {

        return clientRepository.save(clientEntity);
    }
}
