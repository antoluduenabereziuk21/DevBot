package com.back.chatbot.service.impl;


import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.enums.OrderState;
import com.back.chatbot.persistance.entity.OrderEntity;
import com.back.chatbot.persistance.entity.ProductEntity;
import com.back.chatbot.persistance.mapper.OrderMapper;
import com.back.chatbot.persistance.repository.IOrderRepository;
import com.back.chatbot.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public OrderRequestDto createOrder(OrderRequestDto orderRequestDto) {
        System.out.println(orderRequestDto);
        OrderEntity orderEntity = orderMapper.toOrderEntity(orderRequestDto);
        orderEntity.setOrderState(OrderState.IN_PROGRESS);
        orderEntity.getItemsProducts().forEach(
                itemsOrderEntity -> itemsOrderEntity.setOrderEntity(orderEntity)
        );



        return orderMapper.toOrderRequestDto(orderRepository.save(orderEntity));
    }

    @Override
    public List<OrderRequestDto> getAllOrders() {

        List<OrderRequestDto> orderList = orderMapper.toOrderRequestDtoList(orderRepository.findAll());

        return orderList;
    }
    @Override
    public OrderRequestDto getOrderById(String idOrder) {

        OrderRequestDto order = orderMapper.toOrderRequestDto(orderRepository.findById(idOrder).orElseThrow());
        return order;
    }
}
