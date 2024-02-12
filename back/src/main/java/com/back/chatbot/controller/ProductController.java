package com.back.chatbot.controller;


import com.back.chatbot.persistance.entity.ProductEntity;
import com.back.chatbot.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api/product")
@CrossOrigin(value = "http://localhost:3000")
public class ProductController {

    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<?> getAllProducts(){

        List<ProductEntity> productEntityList = productService.getAllProducts();

        return ResponseEntity.status(HttpStatus.OK).body(productEntityList);
    }

    @GetMapping("{idProduct}")
    public ResponseEntity<?> getProductById(@PathVariable String idProduct){

        ProductEntity productEntity = productService.getProductById(idProduct);

        return ResponseEntity.status(HttpStatus.OK).body(productEntity);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductEntity productEntity){

        ProductEntity product = productService.createProduct(productEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }


}
