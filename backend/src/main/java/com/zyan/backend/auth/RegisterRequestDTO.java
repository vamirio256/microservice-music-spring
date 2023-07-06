package com.zyan.backend.auth;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    @NotNull(message = "Invalid username: Username is null")
    private String username;
    @NotNull(message = "Invalid email: Email is null")
    private String email;
    @NotNull(message = "Invalid password: Password is null")
    private String password;
}
