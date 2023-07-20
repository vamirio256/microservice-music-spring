package com.zyan.backend.user.dto;

import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.playlist.PlaylistDTO;
import com.zyan.backend.track.Track;
import com.zyan.backend.track.TrackDTO;
import com.zyan.backend.user.entities.Follow;
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
    private List<FollowDTO> followed;
    private List<FollowDTO> following;
}
