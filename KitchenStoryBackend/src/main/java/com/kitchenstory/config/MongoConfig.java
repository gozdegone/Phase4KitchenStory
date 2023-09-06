package com.kitchenstory.config;

import com.kitchenstory.model.entity.BaseDocument;
import java.util.UUID;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertCallback;

@Configuration
public class MongoConfig {

    @Bean
    public BeforeConvertCallback<BaseDocument> beforeSaveCallback() {
        return (entity, collection) -> {
            if (entity.getId() == null) {
                entity.setId(UUID.randomUUID());
            }
            return entity;
        };
    }
}
