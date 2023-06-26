package com.zyan.backend.playlist;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.track.TrackRepository;
import org.springframework.stereotype.Service;

@Service
public class PlaylistServiceImpl implements PlaylistService{

    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository, TrackRepository trackRepository) {
        this.playlistRepository = playlistRepository;
        this.trackRepository = trackRepository;
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
        playlistRepository.deleteById(id);
    }
}
