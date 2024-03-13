package com.back.chatbot.controller;


import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.service.IOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api/order")
@CrossOrigin(value = "http://localhost:3000")
public class OrderController {
    @Autowired
    private IOrderService orderService;

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
    //, @RequestBody ClientRequestDTO clientRequestDTO)
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDto orderRequestDto){
        System.out.println(orderRequestDto);
        byte[] orderPdf = orderService.createOrder(orderRequestDto);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + orderRequestDto.getIdOrderWA().concat(".pdf") + "\"")
                .body(new ByteArrayResource(orderPdf));
    }

    @GetMapping
    public ResponseEntity<?> getAllOrders(){

        List<OrderRequestDto> orderList = orderService.getAllOrders();

        return ResponseEntity.status(HttpStatus.OK).body(orderList);

    }

    @GetMapping("{idOrder}")
    public ResponseEntity<?> getOrderById(@PathVariable String idOrder){

        OrderRequestDto order = orderService.getOrderById(idOrder);

        return ResponseEntity.status(HttpStatus.OK).body(order);
    }
}
