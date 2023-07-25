package com.zyan.backend.search;

import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.playlist.PlaylistRepository;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.track.repository.TrackRepository;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.UserRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
public class SearchServiceImpl implements SearchService {

    private final TrackRepository trackRepository;
    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;

    public SearchServiceImpl(TrackRepository trackRepository, UserRepository userRepository, PlaylistRepository playlistRepository) {
        this.trackRepository = trackRepository;
        this.userRepository = userRepository;
        this.playlistRepository = playlistRepository;
    }

    @Override
    @Async
    public CompletableFuture<SearchResponseDTO> search(String query) {
        Executor executor = Executors.newFixedThreadPool(3);
        CompletableFuture<List<Track>> tracksFuture = CompletableFuture.supplyAsync(() ->
                trackRepository.findByNameContainingIgnoreCase(query), executor);

        CompletableFuture<List<User>> usersFuture = CompletableFuture.supplyAsync(() ->
                userRepository.findByUsernameContainingIgnoreCase(query), executor);

        CompletableFuture<List<Playlist>> playlistFuture = CompletableFuture.supplyAsync(() ->
                playlistRepository.findByNameContainingIgnoreCase(query), executor);
        return CompletableFuture.allOf(tracksFuture, usersFuture, playlistFuture)
                .thenApply(Void -> SearchResponseDTO.builder()
                        .users(usersFuture.join().stream().map(User::mapUserToUserDTO).collect(Collectors.toList()))
                        .tracks(tracksFuture.join())
                        .playlists(playlistFuture.join())
                        .build());
    }
}
