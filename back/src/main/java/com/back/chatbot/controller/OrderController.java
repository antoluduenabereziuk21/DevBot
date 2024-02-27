package com.back.chatbot.controller;


import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.persistance.entity.OrderEntity;
import com.back.chatbot.service.IOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping()
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDto orderRequestDto){

        OrderRequestDto order = orderService.createOrder(orderRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
}
