package com.kitchenstory.repository;

import com.kitchenstory.model.entity.Product;
import java.util.List;
import java.util.UUID;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, UUID> {

    Product findByName(String name);

    List<Product> findByNameContainingIgnoreCase(String name);
}
