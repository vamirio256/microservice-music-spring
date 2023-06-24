package com.zyan.zyanbackend.playlist;

public interface PlaylistService {
    Playlist getPlaylist(int id);
    Playlist createPlaylist(Playlist playlist);
    void updatePlaylist(Playlist playlist);
    void deletePlaylist(int id);
}
