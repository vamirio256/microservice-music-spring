package com.zyan.backend.security;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenDTO {
    private int userId;
    private String accessToken;
    private String refreshToken;
}
