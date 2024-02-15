package com.back.chatbot.service;

import com.back.chatbot.persistance.entity.OrderEntity;



public interface IOrderService {
    OrderEntity createOrder(OrderEntity orderEntity);

}
