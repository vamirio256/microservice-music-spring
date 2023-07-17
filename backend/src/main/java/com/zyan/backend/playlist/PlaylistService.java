package com.zyan.backend.playlist;

import org.springframework.security.core.userdetails.UserDetails;

public interface PlaylistService {
    Playlist getPlaylist(int id);
    Playlist createPlaylist(Playlist playlist);
    void updatePlaylist(Playlist playlist);
    void deletePlaylist(int id);
    void addTrackToPlaylist(int trackId, int playlistId);
}
