package com.zyan.backend.track.dto;

import com.zyan.backend.user.dto.UserSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrackSummaryDTO {
    private int id;
    private String name;
    private String coverUrl;
    private String audioUrl;
    private int listenedTime;
    private UserSummaryDTO user;
    private boolean favorite;
}
