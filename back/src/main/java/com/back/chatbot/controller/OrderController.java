package com.back.chatbot.controller;

import com.back.chatbot.persistance.entity.OrderEntity;
import com.back.chatbot.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/api/order")
@CrossOrigin(value = "http://localhost:3000")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @PostMapping()
    public ResponseEntity<?> createOrder(OrderEntity orderEntity){

        OrderEntity order = orderService.createOrder(orderEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
}
