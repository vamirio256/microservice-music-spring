package com.zyan.backend.security.jwt;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenDTO {
    private int userId;
    private String accessToken;
    private String refreshToken;
}
