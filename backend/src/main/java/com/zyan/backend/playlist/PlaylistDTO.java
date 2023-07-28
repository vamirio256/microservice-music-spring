package com.zyan.backend.playlist;

import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.track.dto.TrackSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<TrackSummaryDTO> tracks;
}
