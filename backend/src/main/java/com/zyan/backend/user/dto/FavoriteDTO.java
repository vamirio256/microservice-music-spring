package com.zyan.backend.user.dto;

import com.zyan.backend.track.dto.TrackSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteDTO {
    private LocalDateTime addedAt;
    private TrackSummaryDTO track;
}
