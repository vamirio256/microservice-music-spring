package com.zyan.backend.track;

import com.zyan.backend.user.UserDTO;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TrackService {
    Track uploadTrack(UserDTO userDTO, Track track, MultipartFile cover, MultipartFile audio);

    byte[] getTrackCover(Integer trackId);
    void deleteTrack(int trackId);

    byte[] streamTrackAudio(Integer id);

    Track updateTrack(UserDTO userDTO, Track track, MultipartFile cover, MultipartFile audio);
}
