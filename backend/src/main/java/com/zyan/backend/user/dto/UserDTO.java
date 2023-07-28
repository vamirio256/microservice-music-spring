package com.zyan.backend.user.dto;

import com.zyan.backend.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private int id;
    private String username;
    private String email;
    private String avatarUrl;
    private UserRole roles;
    private ProfileDTO profile;
    private boolean isFollowing;
}
