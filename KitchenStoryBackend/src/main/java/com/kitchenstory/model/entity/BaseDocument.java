package com.kitchenstory.model.entity;

import java.util.UUID;
import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public abstract class BaseDocument {

    @Id
    protected UUID id;

    public void setId(UUID id) {

        if (this.id != null) {
            throw new UnsupportedOperationException("ID is already defined");
        }
        this.id = id;
    }

}
