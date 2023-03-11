package com.soundcloudclone.playlistservice.controller;

import com.soundcloudclone.playlistservice.dto.PlaylistRequestDTO;
import com.soundcloudclone.playlistservice.dto.PlaylistResponseDTO;
import com.soundcloudclone.playlistservice.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlist")
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistService playlistService;

    @PostMapping
    public ResponseEntity<PlaylistResponseDTO> createPlaylist(@RequestBody PlaylistRequestDTO playlistRequestDTO){
        PlaylistResponseDTO response = playlistService.createPlaylist(playlistRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/]")
    public
}
