package com.zyan.backend.playlist;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }


    @GetMapping(value = "{playlistId}")
    public ResponseEntity getPlaylist(@PathVariable("playlistId")Integer id){
        return ResponseEntity.ok(playlistService.getPlaylist(id));
    }

    @PostMapping()
    public ResponseEntity createPlaylist(@RequestBody Playlist playlist){
        return ResponseEntity.ok(playlistService.createPlaylist(playlist));
    }
}
