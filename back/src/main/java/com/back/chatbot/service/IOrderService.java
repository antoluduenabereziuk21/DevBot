package com.back.chatbot.service;

import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.persistance.entity.ItemsOrderEntity;
import com.back.chatbot.persistance.entity.OrderEntity;


public interface IOrderService {
    OrderRequestDto createOrder(OrderRequestDto orderRequestDto);

}
