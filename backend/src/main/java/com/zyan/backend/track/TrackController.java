package com.zyan.backend.track;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/track")
public class TrackController {

    private final TrackService trackService;

    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @GetMapping(value = "/cover/{id}")
    public ResponseEntity<byte[]> getTrackCover(@PathVariable("id") int id){
        return ResponseEntity.ok(trackService.getTrackCover(id));
    }

    @GetMapping(value = "/audio/{id}")
    public ResponseEntity<InputStreamResource> streamTrackAudio(@PathVariable("id") int id){
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(trackService.streamTrackAudio(id));
    }

    @PostMapping(
            value = "{userId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Track> uploadTrack(@PathVariable("userId") Integer userId,
                                      @RequestPart("track") Track track,
                                      @RequestPart("cover") MultipartFile cover,
                                      @RequestPart("audio") MultipartFile audio){
        return ResponseEntity.ok(trackService.uploadTrack(userId, track, cover, audio));
    }

    @DeleteMapping(value="{id}")
    public ResponseEntity<String> deleteTrack(@PathVariable("id") int id){
        trackService.deleteTrack(id);
        return ResponseEntity.ok("Successfully deleted track with id [%s]".formatted(id));
    }
}
