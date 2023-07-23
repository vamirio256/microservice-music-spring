package com.zyan.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserSummaryDTO {
    private int id;
    private String username;
    private String email;
    private String avatarUrl;
}
