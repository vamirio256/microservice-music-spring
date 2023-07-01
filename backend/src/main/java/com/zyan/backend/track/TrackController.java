package com.zyan.backend.track;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tracks")
//@CrossOrigin(origins = "*")
public class TrackController {

    private final TrackService trackService;

    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @GetMapping(value = "/cover/{id}")
    public ResponseEntity<byte[]> getTrackCover(@PathVariable("id") int id){

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(trackService.getTrackCover(id));
    }

    @GetMapping(value = "/audio/{id}")
    public ResponseEntity streamTrackAudio(@PathVariable("id") int id){
        byte[] audio = trackService.streamTrackAudio(id);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(audio.length)
                .body(audio);
    }

    @PostMapping(
            value = "{userId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Track> uploadTrack(@PathVariable("userId") String username,
                                      @RequestPart("track") Track track,
                                      @RequestPart("cover") MultipartFile cover,
                                      @RequestPart("audio") MultipartFile audio){
        return ResponseEntity.ok(trackService.uploadTrack(username, track, cover, audio));
    }

    @DeleteMapping(value="{id}")
    public ResponseEntity<String> deleteTrack(@PathVariable("id") int id){
        trackService.deleteTrack(id);
        return ResponseEntity.ok("Successfully deleted track with id [%s]".formatted(id));
    }
}
