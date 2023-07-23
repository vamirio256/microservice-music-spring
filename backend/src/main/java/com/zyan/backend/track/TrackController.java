package com.zyan.backend.track;

import com.zyan.backend.playlist.PlaylistDTO;
import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.user.dto.UserDTO;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/tracks")
//@CrossOrigin(origins = "*")
public class TrackController {

    private final TrackService trackService;

    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TrackDTO> getTrack(@PathVariable("id") int id) {
        return ResponseEntity.ok(trackService.getTrack(id));
    }

    @GetMapping(value = "/cover/{id}")
    public ResponseEntity<byte[]> getTrackCover(@PathVariable("id") int id) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(trackService.getTrackCover(id));
    }

    @GetMapping(value = "/audio/{id}")
    public ResponseEntity<byte[]> streamTrackAudio(@PathVariable("id") int id) {
        byte[] audio = trackService.streamTrackAudio(id);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(audio.length)
                .body(audio);
    }

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrackDTO> uploadTrack(
            @RequestPart("track") Track track,
            @RequestPart("cover") MultipartFile cover,
            @RequestPart("audio") MultipartFile audio) {
        return ResponseEntity.ok(trackService.uploadTrack(track, cover, audio));
    }

    @PutMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Track> updateTrack(@RequestPart("user") UserDTO userDTO,
                                             @RequestPart("track") Track track,
                                             @RequestPart("cover") MultipartFile cover,
                                             @RequestPart("audio") MultipartFile audio,
                                             @RequestPart("waveform") MultipartFile waveform) {
        return ResponseEntity.ok(trackService.updateTrack(userDTO, track, cover, audio, waveform));
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<String> deleteTrack(@PathVariable("id") int id) {
        trackService.deleteTrack(id);
        return ResponseEntity.ok("Successfully deleted track with id [%s]".formatted(id));
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<TrackDTO>> search(@RequestParam("query") String query) {
        return ResponseEntity.ok(trackService.search(query));
    }

    @PostMapping(value = "/{trackId}/increase-listened-time")
    public void increasedListenedTime(@PathVariable("trackId") int trackId) {
        trackService.increaseListenedTime(trackId);
    }

    @GetMapping(value = "/latest")
    public ResponseEntity<PlaylistDTO> getLatestTracks() {
        return ResponseEntity.ok(trackService.getLastestTracks());
    }

    @GetMapping(value = "/popular")
    public ResponseEntity<PlaylistDTO> getPopularTracks() {
        return ResponseEntity.ok(trackService.getPopularTracks());
    }

    @PostMapping(value = "/{trackId}/comments")
    public ResponseEntity<String> postComment(
            @PathVariable int trackId,
            @RequestParam("context") String context) {
        trackService.postComment(trackId, context);
        return ResponseEntity.ok("Post comment succesfully");
    }

    @DeleteMapping(value = "/comments/{commentId}")
    public ResponseEntity<String> deleteComment(
            @PathVariable int commentId) {
        trackService.deleteComment(commentId);
        return ResponseEntity.status(HttpStatusCode.valueOf(204)).body("Deleted comment succesfully");
    }
}
