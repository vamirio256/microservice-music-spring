package com.zyan.backend.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private int id;
    private String username;
    private String email;
    private UserRole roles;
}
