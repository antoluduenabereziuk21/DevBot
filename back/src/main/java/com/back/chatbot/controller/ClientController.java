package com.back.chatbot.controller;

import com.back.chatbot.persistance.entity.ClientEntity;
import com.back.chatbot.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api/client")
@CrossOrigin(value = "http://localhost:3000")
public class ClientController {

    @Autowired
    private IClientService clientService;

    @GetMapping
    public ResponseEntity<?> getAllClients(){

        List<ClientEntity> clientEntityList = clientService.getAllClients();

        return ResponseEntity.status(HttpStatus.OK).body(clientEntityList);
    }

    @GetMapping("{idClient}")
    public ResponseEntity<?> getClientById(@PathVariable String idClient){

        ClientEntity clientEntity = clientService.getClientById(idClient);

        return ResponseEntity.status(HttpStatus.OK).body(clientEntity);
    }

    @PostMapping
    public ResponseEntity<?> createClient(@RequestBody ClientEntity clientEntity){

        ClientEntity client = clientService.createClient(clientEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(client);
    }





}
