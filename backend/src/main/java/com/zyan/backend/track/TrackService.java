package com.zyan.backend.track;

import com.zyan.backend.user.UserDTO;
import org.springframework.web.multipart.MultipartFile;

public interface TrackService {
    Track uploadTrack(Track track, MultipartFile cover, MultipartFile audio);

    byte[] getTrackCover(Integer trackId);
    void deleteTrack(int trackId);

    byte[] streamTrackAudio(Integer id);

    Track updateTrack(UserDTO userDTO, Track track, MultipartFile cover, MultipartFile audio);

    Track getTrack(int id);
}
