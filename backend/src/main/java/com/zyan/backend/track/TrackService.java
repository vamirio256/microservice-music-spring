package com.zyan.backend.track;

import com.zyan.backend.user.dto.UserDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TrackService {
    Track uploadTrack(Track track, MultipartFile cover, MultipartFile audio, MultipartFile waveform);

    byte[] getTrackCover(Integer trackId);
    void deleteTrack(int trackId);

    byte[] streamTrackAudio(Integer id);

    Track updateTrack(UserDTO userDTO, Track track, MultipartFile cover, MultipartFile audio, MultipartFile waveform);

    Track getTrack(int id);

    List<Track> search(String query);
}
