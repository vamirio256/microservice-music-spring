package com.zyan.backend.playlist;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlists")
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
    public ResponseEntity<Playlist> createPlaylist(
            @RequestPart("playlist") Playlist playlist){
        return ResponseEntity.ok(playlistService.createPlaylist(playlist));
    }

    @PostMapping("/{playlistId}/add-track/{trackId}")
    public ResponseEntity<String> addTrackToPlaylist(@PathVariable int playlistId,
                                                       @PathVariable int trackId){
        playlistService.addTrackToPlaylist(trackId, playlistId);
        return ResponseEntity.ok("Add successfully");
    }
}
