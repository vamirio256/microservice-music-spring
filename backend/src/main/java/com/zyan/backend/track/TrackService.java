package com.zyan.backend.track;

import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TrackService {
    Track uploadTrack(int userId, Track track, MultipartFile cover, MultipartFile audio);

    byte[] getTrackCover(Integer trackId);
    void deleteTrack(int trackId);

    InputStreamResource streamTrackAudio(Integer id);
}
