package com.zyan.zyanbackend.playlist;

import com.zyan.zyanbackend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PlaylistServiceImpl implements PlaylistService{

    private final PlaylistRepository playlistRepository;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    @Override
    public Playlist getPlaylist(int id) {
        return playlistRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("Playlist with id [%s] not found".formatted(id)));
    }

    @Override
    public Playlist createPlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    @Override
    public void updatePlaylist(Playlist playlist) {

    }

    @Override
    public void deletePlaylist(int id) {

    }
}
