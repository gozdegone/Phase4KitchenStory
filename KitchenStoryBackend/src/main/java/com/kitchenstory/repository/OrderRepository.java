package com.kitchenstory.repository;

import com.kitchenstory.model.entity.Order;
import java.util.UUID;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Order, UUID> {

}
