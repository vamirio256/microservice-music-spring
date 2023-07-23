package com.zyan.backend.track.dto;

import com.zyan.backend.user.dto.UserSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private int id;
    private String context;
    private LocalDateTime addAt;
    private UserSummaryDTO user;
}
