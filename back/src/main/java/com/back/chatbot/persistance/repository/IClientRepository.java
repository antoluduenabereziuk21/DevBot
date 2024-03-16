package com.back.chatbot.persistance.repository;

import com.back.chatbot.persistance.entity.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IClientRepository extends JpaRepository<ClientEntity, String> {

    @Query(value = "SELECT * FROM client_entity WHERE cel_Phone = :cellPhone", nativeQuery = true)
    ClientEntity findClientByCellPhone(@Param("cellPhone") String cellPhone);
}
