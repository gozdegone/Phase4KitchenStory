package com.kitchenstory.controller;

import com.kitchenstory.model.entity.Product;
import com.kitchenstory.services.ProductService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        this.productService.addProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = this.productService.listProducts();
            return ResponseEntity.ok(products);
        } catch (NotFoundException e) {
            log.warn("No product found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") UUID id) {
        try {
            Product product = this.productService.getProduct(id);
            return ResponseEntity.ok(product);
        } catch (NotFoundException e) {
            log.warn("No product found with id: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/filter/{name}")
    public ResponseEntity<List<Product>> getProducts(@PathVariable("name") String name) {

        try {
            List<Product> products = this.productService.getAllByName(name);
            return ResponseEntity.ok(products);
        } catch (NotFoundException e) {
            log.warn("No product found with name: {}", name);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable("id") UUID id) {
        this.productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") UUID id, @RequestBody Product product) {
        try {
            this.productService.updateProduct(id, product);
        } catch (NotFoundException e) {
            log.warn("No product found with id: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.noContent().build();
    }

}
