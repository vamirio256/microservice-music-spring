package com.zyan.backend.playlist;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.playlist_track.PlaylistTrack;
import com.zyan.backend.playlist_track.PlaylistTrackRepository;
import com.zyan.backend.track.Track;
import com.zyan.backend.track.TrackRepository;
import com.zyan.backend.user.UserRepository;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;
    private final PlaylistTrackRepository playlistTrackRepository;
    private final UserRepository userRepository;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository, TrackRepository trackRepository, PlaylistTrackRepository playlistTrackRepository, UserRepository userRepository) {
        this.playlistRepository = playlistRepository;
        this.trackRepository = trackRepository;
        this.playlistTrackRepository = playlistTrackRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Playlist getPlaylist(int id) {
        return playlistRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Playlist with id [%s] not found".formatted(id)));
    }

    @Override
    public Playlist createPlaylist(Playlist playlist) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(user.getProfile());
        Profile profile = user.getProfile();
        playlist.setProfile(profile);
        playlist.setCreatedAt(LocalDateTime.now());
        return playlistRepository.save(playlist);
    }

    @Override
    public void updatePlaylist(Playlist playlist) {
        playlistRepository.save(playlist);
    }

    @Override
    public void deletePlaylist(int id) {
        playlistRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void addTrackToPlaylist(int trackId, int playlistId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(()->new ResourceNotFoundException("Playlist with id '%s' not found".formatted(playlistId)));
        Track track = trackRepository.findById(trackId)
                .orElseThrow(()->new ResourceNotFoundException("Track with id '%s' not found".formatted(trackId)));
        PlaylistTrack playlistTrack = new PlaylistTrack();
        playlistTrack.setPlaylist(playlist);
        playlistTrack.setTrack(track);
        playlistTrack.setAddedAt(LocalDateTime.now());

        track.getPlaylistTracks().add(playlistTrack);
        playlist.getPlaylistTracks().add(playlistTrack);

        playlistTrackRepository.save(playlistTrack);
        trackRepository.save(track);
        playlistRepository.save(playlist);
    }
}
