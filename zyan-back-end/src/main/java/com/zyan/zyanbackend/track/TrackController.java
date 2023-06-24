package com.zyan.zyanbackend.track;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/track")
public class TrackController {

    private final TrackService trackService;

    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @GetMapping(
            value = "{trackId}"
    )
    public byte[] getTrack(@PathVariable("trackId") Integer trackId){
        return trackService.getTrack(trackId);
    }

    @PostMapping(
            value = "{userId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Track> uploadTrack(@PathVariable("userId") Integer userId,
                                      @RequestPart("track") Track track,
                                      @RequestPart("file") MultipartFile multipartFile){
        return ResponseEntity.ok(trackService.uploadTrack(userId, track, multipartFile));
    }
}
