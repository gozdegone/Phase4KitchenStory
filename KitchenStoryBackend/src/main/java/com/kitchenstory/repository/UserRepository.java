package com.kitchenstory.repository;

import com.kitchenstory.model.entity.User;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, UUID> {

    Optional<User> findByUsername(String username);

}
