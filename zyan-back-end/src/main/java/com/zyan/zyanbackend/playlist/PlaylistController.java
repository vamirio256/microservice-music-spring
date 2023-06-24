package com.zyan.zyanbackend.playlist;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/playlist")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }


    @GetMapping(value = "{playlistId}")
    public ResponseEntity<Playlist> getPlaylist(@PathVariable("playlistId")Integer id){
        return ResponseEntity.ok(playlistService.getPlaylist(id));
    }

    @PostMapping()
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist){
        System.out.println(playlist);
        return ResponseEntity.ok(playlistService.createPlaylist(playlist));
    }
}
