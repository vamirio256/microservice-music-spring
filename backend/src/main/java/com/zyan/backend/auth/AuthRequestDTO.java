package com.zyan.backend.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDTO {
    @NotNull(message = "Invalid email: Email is null")
    @NotBlank(message = "")
    private String email;
    @NotNull(message = "Invalid Password: Password is null")
    private String password;
}
