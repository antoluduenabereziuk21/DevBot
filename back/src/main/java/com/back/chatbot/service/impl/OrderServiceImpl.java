package com.back.chatbot.service.impl;


import com.back.chatbot.controller.dto.request.ClientRequestDTO;
import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.enums.OrderState;
import com.back.chatbot.persistance.entity.ClientEntity;
import com.back.chatbot.persistance.entity.OrderEntity;
import com.back.chatbot.persistance.mapper.ClientMapper;
import com.back.chatbot.persistance.mapper.OrderMapper;
import com.back.chatbot.persistance.repository.IClientRepository;
import com.back.chatbot.persistance.repository.IOrderRepository;
import com.back.chatbot.service.IOrderService;
import com.back.chatbot.service.IReportService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ClientMapper clientMapper;
    @Autowired
    private IClientRepository clientRepository;

    @Autowired
    private IReportService reportService;

    @SneakyThrows
    @Transactional
    @Modifying
    @Override
    public byte[] createOrder(OrderRequestDto orderRequestDto) {
        System.out.println(orderRequestDto);

        Boolean delivery = orderRequestDto.isDelivery();

        var clientDto=orderRequestDto.getClient();
        OrderEntity orderEntity = orderMapper.toOrderEntity(orderRequestDto);
        ClientEntity client = clientMapper.toClientEntity(clientDto);

        orderEntity.setOrderState(OrderState.IN_PROGRESS);
        orderEntity.getItemsProducts().forEach(
                itemsOrderEntity -> itemsOrderEntity.setOrderEntity(orderEntity)
        );

         ClientEntity clientFind = clientRepository.findClientByCellPhone(clientDto.getCel_phone());

         //Si existe creamelo
         if (Objects.isNull(clientFind)) {
             //si es nulo crealo con lo que tenga...
             clientRepository.save(client);
         }

         if(orderRequestDto.isDelivery()){
             clientFind.setName(client.getName());
             clientFind.setCel_phone(client.getCel_phone());
             clientFind.setLast_name(client.getLast_name());
             clientFind.setAddress(client.getAddress());
             clientFind.setLocality("");
             clientFind.setReference(client.getReference());
             clientRepository.save(clientFind);
         }
        OrderEntity order = orderRepository.save(orderEntity);



        //se comprueba si existe cliente
//        String  cellClient = orderRequestDto.getCellPhone();
//       ClientEntity clientFind = clientRepository.findClientByCellPhone(cellClient);
//        if(clientFind==null||clientFind.getName().isBlank()){
////            ClientEntity client = new ClientEntity();
////            client.setCel_phone(cellClient);
//            clientRepository.save(client);//cliente vacios --- vacios con los campos completos
//        }


        return reportService.exportReport(order.getIdOrder(),client.getCel_phone(), delivery);
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
