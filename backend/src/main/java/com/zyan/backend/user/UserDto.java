package com.zyan.backend.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private int id;
    private String username;

    public static UserDTO from(User user){
        return builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }
}
