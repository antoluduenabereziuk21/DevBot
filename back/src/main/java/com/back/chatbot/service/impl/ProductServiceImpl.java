package com.back.chatbot.service.impl;

import com.back.chatbot.persistance.entity.ProductEntity;
import com.back.chatbot.persistance.repository.IProductRepository;
import com.back.chatbot.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public List<ProductEntity> getAllProducts() {

        List<ProductEntity> productList = productRepository.findAll();

        return productList;
    }

    @Override
    public ProductEntity getProductById(String idProduct) {

        ProductEntity product = productRepository.findById(idProduct).orElseThrow();

        return product;
    }

    @Override
    public ProductEntity createProduct(ProductEntity productEntity) {

        return productRepository.save(productEntity);
    }
}
