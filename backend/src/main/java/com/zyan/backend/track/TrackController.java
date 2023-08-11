package com.zyan.backend.track;

import com.zyan.backend.playlist.PlaylistDTO;
import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.track.dto.TrackSummaryDTO;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.user.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<TrackDTO> getTrack(@AuthenticationPrincipal User user, @PathVariable("id") int id) {
        return ResponseEntity.ok(trackService.getTrack(user, id));
    }

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrackDTO> uploadTrack(
            @AuthenticationPrincipal User user,
            @RequestPart("track") Track track,
            @RequestPart("cover") MultipartFile cover,
            @RequestPart("audio") MultipartFile audio) {
        return ResponseEntity.ok(trackService.uploadTrack(user, track, cover, audio));
    }

    @PutMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Track> updateTrack(@AuthenticationPrincipal User user,
                                             @RequestPart("track") Track track,
                                             @RequestPart("cover") MultipartFile cover,
                                             @RequestPart("audio") MultipartFile audio) {
        return ResponseEntity.ok(trackService.updateTrack(user, track, cover, audio));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteTrack(@AuthenticationPrincipal User user,
                                              @PathVariable("id") int id) {
        trackService.deleteTrack(user, id);
        return ResponseEntity.ok("Successfully deleted track with id [%s]".formatted(id));
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<TrackDTO>> search(
            @AuthenticationPrincipal User user,
            @RequestParam("query") String query) {
        return ResponseEntity.ok(trackService.search(user, query));
    }

    @PostMapping(value = "/{trackId}/increase-listened-time")
    public void increasedListenedTime(
            @PathVariable("trackId") int trackId) {
        trackService.increaseListenedTime(trackId);
    }

    @GetMapping(value = "/latest")
    public ResponseEntity<PlaylistDTO> getLatestTracks(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(trackService.getLatestTracks(user));
    }

    @GetMapping(value = "/popular")
    public ResponseEntity<PlaylistDTO> getPopularTracks(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(trackService.getPopularTracks(user));
    }

    @PostMapping(value = "/{trackId}/comments")
    public ResponseEntity<String> postComment(
            @AuthenticationPrincipal User user,
            @PathVariable int trackId,
            @RequestParam("context") String context) {
        trackService.postComment(user, trackId, context);
        return ResponseEntity.ok("Post comment succesfully");
    }

    @DeleteMapping(value = "/comments/{commentId}")
    public ResponseEntity<String> deleteComment(
            @AuthenticationPrincipal User user,
            @PathVariable int commentId) {
        trackService.deleteComment(user, commentId);
        return ResponseEntity.status(HttpStatusCode.valueOf(204)).body("Deleted comment succesfully");
    }

    @GetMapping(value = "/")
    public ResponseEntity<List<TrackSummaryDTO>> getTrackWithPagination(
            @AuthenticationPrincipal User user,
            @RequestParam("offset") int offset,
            @RequestParam("page") int page) {
        return ResponseEntity.ok(trackService.getTrackWithPagination(user, offset, page));
    }
}
