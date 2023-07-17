package com.zyan.backend.user.dto;

import com.zyan.backend.track.Track;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.entities.User;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
@Builder
public class UserDTO {
    private int id;
    @Size(min = 3, max = 10, message = "Username should be 3-10 characters")
    private String username;
    private String email;
    private UserRole roles;
}
