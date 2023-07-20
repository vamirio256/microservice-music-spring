package com.zyan.backend.user.dto;

import com.zyan.backend.track.Track;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.entities.User;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;

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
}
