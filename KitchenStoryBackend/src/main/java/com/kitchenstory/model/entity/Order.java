package com.kitchenstory.model.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Orders")
@AllArgsConstructor
@Data
public class Order extends BaseDocument {

    @Indexed(unique = true)
    private String name;
    private String address;
    private String state;
    private String contact;
    private String od;
    private int quantity;
    private String payment;

    @DBRef
    private Product product;

}
