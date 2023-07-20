package com.zyan.backend.playlist;

import com.zyan.backend.track.TrackDTO;
import com.zyan.backend.user.dto.UserSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaylistDTO {
    private int id;
    private String name;
    private String coverUrl;
    private boolean isPublic;
    private LocalDateTime createdAt;
    private List<TrackDTO> tracks;
}
