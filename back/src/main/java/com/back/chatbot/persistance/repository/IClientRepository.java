package com.back.chatbot.persistance.repository;

import com.back.chatbot.persistance.entity.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IClientRepository extends JpaRepository<ClientEntity, String> {
}
