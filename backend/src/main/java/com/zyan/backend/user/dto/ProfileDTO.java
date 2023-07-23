package com.zyan.backend.user.dto;

import com.zyan.backend.playlist.PlaylistDTO;
import com.zyan.backend.track.dto.TrackDTO;
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
    private List<TrackDTO> tracks;
    private List<PlaylistDTO> playlists;
    private List<FollowDTO> follow;
    private List<TrackDTO> favoriteTracks;
}
