package com.zyan.backend.track;

import com.zyan.backend.playlist.PlaylistDTO;
import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.user.dto.UserDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TrackService {
    TrackDTO uploadTrack(Track track, MultipartFile cover, MultipartFile audio);

    byte[] getTrackCover(Integer trackId);
    void deleteTrack(int trackId);

    byte[] streamTrackAudio(Integer id);

    Track updateTrack(UserDTO userDTO, Track track, MultipartFile cover, MultipartFile audio, MultipartFile waveform);

    TrackDTO getTrack(int id);

    List<TrackDTO> search(String query);

    void increaseListenedTime(int trackId);

    PlaylistDTO getLastestTracks();

    PlaylistDTO getPopularTracks();

    void postComment(int trackid, String context);
    void deleteComment(int commentId);
}
