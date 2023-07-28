package com.zyan.backend.track;

import com.zyan.backend.playlist.PlaylistDTO;
import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TrackService {
    TrackDTO uploadTrack(User user, Track track, MultipartFile cover, MultipartFile audio);

    Track updateTrack(User user, Track track, MultipartFile cover, MultipartFile audio);
    void deleteTrack(User user, int id);

    TrackDTO getTrack(User user, int id);

    List<TrackDTO> search(User user, String query);

    void increaseListenedTime(int trackId);

    PlaylistDTO getLatestTracks(User user);

    PlaylistDTO getPopularTracks(User user);

    void postComment(User user, int trackid, String context);
    void deleteComment(User user, int commentId);
}
