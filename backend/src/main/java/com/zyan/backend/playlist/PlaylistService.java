package com.zyan.backend.playlist;

import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.user.entities.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface PlaylistService {
    PlaylistDTO getPlaylist(User user,int id);
    PlaylistDTO createPlaylist(PlaylistDTO playlist);
    PlaylistDTO updatePlaylist(PlaylistDTO playlist);
    void deletePlaylist(int id);
    PlaylistDTO addTrackToPlaylist(User user, int trackId, int playlistId);

    PlaylistDTO createPlaylistWithFirstTrack(PlaylistDTO playlist, TrackDTO trackId);
}
