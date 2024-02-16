package com.back.chatbot.service.impl;


import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.persistance.entity.ItemsOrderEntity;
import com.back.chatbot.persistance.entity.OrderEntity;
import com.back.chatbot.persistance.mapper.ItemsOrderMapper;
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

        OrderEntity orderEntity = orderMapper.toOrderEntity(orderRequestDto);
        orderEntity.getItemsProducts().forEach(
                itemsOrderEntity -> itemsOrderEntity.setOrderEntity(orderEntity)
        );

        return orderMapper.toOrderRequestDto(orderRepository.save(orderEntity));


        //OrderEntity order = orderRepository.save(orderEntity);

//        for (ItemsOrderEntity item: order.getItemsProducts()) {
//
//            item.setOrderEntity(order);
//
//        }

        //ItemsOrderEntity itemsOrder = new ItemsOrderEntity();

        //itemsOrder.setOrderEntity(order);

       // return orderRepository.save(order);
    }
}
