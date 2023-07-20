package com.zyan.backend.playlist;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.track.Track;
import com.zyan.backend.track.TrackRepository;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;
    private final UserRepository userRepository;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository, TrackRepository trackRepository, UserRepository userRepository) {
        this.playlistRepository = playlistRepository;
        this.trackRepository = trackRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public PlaylistDTO getPlaylist(int id) {

        Playlist playlist = playlistRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Playlist with id [%s] not found".formatted(id)));

        return playlist.mapPlaylistToPlaylistDTO();
    }

    @Override
    @Transactional
    public PlaylistDTO createPlaylist(PlaylistDTO playlistDTO) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(user.getProfile());
        Profile profile = user.getProfile();
        Playlist playlist = Playlist.builder()
                .name(playlistDTO.getName())
                .isPublic(playlistDTO.isPublic())
                .profile(profile)
                .createdAt(LocalDateTime.now())
                .build();

        return playlistRepository.save(playlist).mapPlaylistToPlaylistDTO();
    }

    @Override
    public PlaylistDTO updatePlaylist(PlaylistDTO playlistDTO) {
        Playlist updatePlaylist = playlistRepository.findById(playlistDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Playlist with id '%s' not found".formatted(playlistDTO.getId())));

        updatePlaylist.setName(playlistDTO.getName());
        updatePlaylist.setPublic(playlistDTO.isPublic());
        return playlistRepository.save(updatePlaylist).mapPlaylistToPlaylistDTO();
    }

    @Override
    public void deletePlaylist(int id) {
        playlistRepository.deleteById(id);
    }

    @Override
    @Transactional
    public PlaylistDTO addTrackToPlaylist(int trackId, int playlistId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResourceNotFoundException("Playlist with id '%s' not found".formatted(playlistId)));
        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("Track with id '%s' not found".formatted(trackId)));

        track.getPlaylists().add(playlist);
        playlist.getTracks().add(track);

        trackRepository.save(track);
        return playlistRepository.save(playlist).mapPlaylistToPlaylistDTO();
    }
}
