package com.back.chatbot.persistance.mapper;

import com.back.chatbot.controller.dto.request.OrderRequestDto;
import com.back.chatbot.persistance.entity.OrderEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring", uses = ItemsOrderMapper.class)
public interface OrderMapper {

//    @Mappings(
//            {
//                    @Mapping(source = "idOrder", target = "idOrder"),
//                    @Mapping(source = "orderState", target = "orderState"),
//                    @Mapping(source = "total", target = "total"),
//                    @Mapping(source = "itemsProducts", target = "itemsProducts")
//            }
//    )
    OrderRequestDto toOrderRequestDto(OrderEntity orderEntity);
    List<OrderRequestDto> toOrderRequestDtoList(List<OrderEntity> orderEntityList);

    @InheritInverseConfiguration
    OrderEntity toOrderEntity(OrderRequestDto orderRequestDto);


}
