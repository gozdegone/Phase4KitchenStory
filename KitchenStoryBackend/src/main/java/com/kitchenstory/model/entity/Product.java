package com.kitchenstory.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Products")
@Data
@AllArgsConstructor
@Accessors(chain = true)
public class Product extends BaseDocument {

    @Indexed(unique = true)
    private String name;
    private String pid;
    private String category;
    private String ingredient;
    private int price;
    private String brand;
    private String quantity;
    private String origin;


}
