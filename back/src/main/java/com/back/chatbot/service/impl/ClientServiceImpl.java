package com.back.chatbot.service.impl;

import com.back.chatbot.controller.dto.response.ClientResponseDTO;
import com.back.chatbot.persistance.entity.ClientEntity;
import com.back.chatbot.persistance.mapper.ClientMapper;
import com.back.chatbot.persistance.repository.IClientRepository;
import com.back.chatbot.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements IClientService {

    @Autowired
    private IClientRepository clientRepository;

    @Autowired
    private ClientMapper clientMapper;

    @Override
    public List<ClientResponseDTO> getAllClients() {

        return clientMapper.toGetListClientResponseDto(clientRepository.findAll());

    }

    @Override
    public ClientResponseDTO getClientById(String idClient) {

        ClientEntity client = clientRepository.findById(idClient).orElseThrow();

        ClientResponseDTO clientResponseDTO = clientMapper.toClientResponseDto(client);

        return clientResponseDTO;
    }

    @Override
    public ClientEntity createClient(ClientEntity clientEntity) {

        return clientRepository.save(clientEntity);
    }
}
