package com.zyan.backend.playlist;

import com.zyan.backend.track.dto.TrackDTO;
import org.apache.coyote.Response;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }


    @GetMapping(value = "/{playlistId}")
    public ResponseEntity<PlaylistDTO> getPlaylist(@PathVariable("playlistId") Integer id) {
        return ResponseEntity.ok(playlistService.getPlaylist(id));
    }

//    @PostMapping()
//    public ResponseEntity<PlaylistDTO> createPlaylist(
//            @RequestPart("playlist") PlaylistDTO playlist) {
//        return ResponseEntity.ok(playlistService.createPlaylist(playlist));
//    }

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<PlaylistDTO> createPlaylistWithFirstTrack(
            @RequestPart("playlist") PlaylistDTO playlist,
            @RequestPart("track") TrackDTO track) {
        return ResponseEntity.ok(playlistService.createPlaylistWithFirstTrack(playlist, track));
    }

    @PutMapping()
    public ResponseEntity<PlaylistDTO> updatePlaylist(@RequestPart("playlist")PlaylistDTO playlist){
        return ResponseEntity.ok(playlistService.updatePlaylist(playlist));
    }

    @PostMapping("/{playlistId}/add-track/{trackId}")
    public ResponseEntity<PlaylistDTO> addTrackToPlaylist(@PathVariable int playlistId,
                                                          @PathVariable int trackId) {
        return ResponseEntity.ok(playlistService.addTrackToPlaylist(trackId, playlistId));
    }
}
