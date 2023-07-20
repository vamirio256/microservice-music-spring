package com.zyan.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FollowDTO {
    private int id;
    private LocalDateTime addedAt;
    private UserSummaryDTO following;
    private UserSummaryDTO followed;
}
