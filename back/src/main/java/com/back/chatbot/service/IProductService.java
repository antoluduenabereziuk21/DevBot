package com.back.chatbot.service;

import com.back.chatbot.persistance.entity.ProductEntity;

import java.util.List;

public interface IProductService {
    List<ProductEntity> getAllProducts();

    ProductEntity getProductById(String idProduct);

    ProductEntity createProduct(ProductEntity productEntity);
}
