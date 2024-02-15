package com.back.chatbot.controller;

import com.back.chatbot.controller.dto.response.ClientResponseDTO;
import com.back.chatbot.persistance.entity.ClientEntity;
import com.back.chatbot.service.IClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

        return ResponseEntity.status(HttpStatus.OK).body(clientService.getAllClients());
    }

    @GetMapping("{idClient}")
    public ResponseEntity<?> getClientById(@PathVariable String idClient){

        ClientResponseDTO client = clientService.getClientById(idClient);

        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @Operation(
            responses = {
                    @ApiResponse(
                    responseCode = "201",
                    description = "Created",
                    content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = String.class))}
                    ),
                    @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request"
                    )
            }
    )
    @PostMapping
    public ResponseEntity<?> createClient(@RequestBody ClientEntity clientEntity){

        ClientEntity client = clientService.createClient(clientEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(client);
    }





}
