package com.back.chatbot.persistance.mapper;

import com.back.chatbot.controller.dto.request.ClientRequestDTO;
import com.back.chatbot.controller.dto.response.ClientResponseDTO;
import com.back.chatbot.persistance.entity.ClientEntity;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,injectionStrategy = InjectionStrategy.CONSTRUCTOR)

public interface ClientMapper {
    ClientEntity toClientEntity(ClientRequestDTO clientRequestDTO);

    ClientResponseDTO toClientResponseDto(ClientEntity clientEntity);

    List<ClientResponseDTO> toGetListClientResponseDto(List<ClientEntity> clientEntityList);
}
