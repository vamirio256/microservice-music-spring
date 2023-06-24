package com.zyan.zyanbackend.track;

import com.zyan.zyanbackend.user.UserService;
import org.springframework.web.multipart.MultipartFile;

public interface TrackService {
    Track uploadTrack(int userId, Track track,MultipartFile file);

    byte[] getTrack(Integer trackId);
    void delete(int trackId);
}
