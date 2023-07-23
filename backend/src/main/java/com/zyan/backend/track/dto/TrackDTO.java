package com.zyan.backend.track.dto;

import com.zyan.backend.user.dto.UserSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackDTO {
    private int id;
    private String name;
    private String coverUrl;
    private String audioUrl;
    private int listenedTime;
    private UserSummaryDTO user;
    private List<CommentDTO> comments;
}
