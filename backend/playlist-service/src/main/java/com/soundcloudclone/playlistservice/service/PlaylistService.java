package com.soundcloudclone.playlistservice.service;

import com.soundcloudclone.playlistservice.dto.PlaylistRequestDTO;
import com.soundcloudclone.playlistservice.dto.PlaylistResponseDTO;
import com.soundcloudclone.playlistservice.entity.Playlist;
import com.soundcloudclone.playlistservice.repository.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;

    public PlaylistResponseDTO createPlaylist(PlaylistRequestDTO playlistRequestDTO) {
        Playlist playlist = Playlist.builder()
                .name(playlistRequestDTO.getName())
                .isPublic(playlistRequestDTO.isPublic())
                .build();
        playlistRepository.save(playlist);
        return mapToPlaylistResponseDTO(playlist);
    }

    private PlaylistResponseDTO mapToPlaylistResponseDTO(Playlist playlist) {
        return PlaylistResponseDTO.builder()
                .isPublic(playlist.isPublic())
                .name(playlist.getName())
                .build();
    }
}
