package com.back.chatbot.persistance.mapper;

import com.back.chatbot.controller.dto.request.ItemsOrderRequestDto;
import com.back.chatbot.persistance.entity.ItemsOrderEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring",uses = OrderMapper.class)
public interface ItemsOrderMapper {
//    @Mappings(
//            {
//                @Mapping(source = "price", target = "price"),
//                @Mapping(source = "description", target = "description"),
//                @Mapping(source = "quantity", target = "quantity"),
//                @Mapping(source = "orderEntity.idOrder", target = "idOrder")
//            }
//    )
    ItemsOrderRequestDto toItemsOrderRequestDto(ItemsOrderEntity itemsOrderEntity);
    List<ItemsOrderRequestDto> toItemsOrderRequestDtoList(List<ItemsOrderEntity> itemsOrderEntityList);

    @InheritInverseConfiguration
    ItemsOrderEntity toItemsOrderEntity(ItemsOrderRequestDto itemsOrderRequestDto);

}
