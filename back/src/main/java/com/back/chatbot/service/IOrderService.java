package com.back.chatbot.service;

import com.back.chatbot.controller.dto.request.ClientRequestDTO;
import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.persistance.entity.ItemsOrderEntity;
import com.back.chatbot.persistance.entity.OrderEntity;

import java.util.List;


public interface IOrderService {
    byte[] createOrder(OrderRequestDto orderRequestDto);
    List<OrderRequestDto> getAllOrders();
    OrderRequestDto getOrderById(String idOrder);
}
