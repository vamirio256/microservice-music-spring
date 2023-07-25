package com.zyan.backend.playlist;

import com.zyan.backend.track.dto.TrackDTO;
import org.springframework.security.core.userdetails.UserDetails;

public interface PlaylistService {
    PlaylistDTO getPlaylist(int id);
    PlaylistDTO createPlaylist(PlaylistDTO playlist);
    PlaylistDTO updatePlaylist(PlaylistDTO playlist);
    void deletePlaylist(int id);
    PlaylistDTO addTrackToPlaylist(int trackId, int playlistId);

    PlaylistDTO createPlaylistWithFirstTrack(PlaylistDTO playlist, TrackDTO trackId);
}
