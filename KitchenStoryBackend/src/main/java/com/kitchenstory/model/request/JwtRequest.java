package com.kitchenstory.model.request;

import lombok.Data;

@Data
public class JwtRequest {

    private final String username;
    private final String password;

}
