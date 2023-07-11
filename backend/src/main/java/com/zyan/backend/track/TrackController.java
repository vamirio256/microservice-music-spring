package com.zyan.backend.track;

import com.zyan.backend.user.UserDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/tracks")
//@CrossOrigin(origins = "*")
public class TrackController {

    private final TrackService trackService;

    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Track> getTrack(@PathVariable("id") int id){
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
    public ResponseEntity<Track> uploadTrack(
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
                                             @RequestPart("audio") MultipartFile audio) {
        return ResponseEntity.ok(trackService.updateTrack(userDTO, track, cover, audio));
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<String> deleteTrack(@PathVariable("id") int id) {
        trackService.deleteTrack(id);
        return ResponseEntity.ok("Successfully deleted track with id [%s]".formatted(id));
    }
}
