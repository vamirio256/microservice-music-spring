package com.zyan.backend.user.dto;

import com.zyan.backend.playlist.PlaylistDTO;
import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.track.dto.TrackSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileDTO {
    private List<TrackSummaryDTO> tracks;
    private List<PlaylistDTO> playlists;
    private List<FollowDTO> follows;
    private List<FavoriteDTO> favorites;
}
