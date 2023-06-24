package com.zyan.zyanbackend.track;

import com.zyan.zyanbackend.exception.ResourceNotFoundException;
import com.zyan.zyanbackend.s3.S3Bucket;
import com.zyan.zyanbackend.s3.S3Service;
import com.zyan.zyanbackend.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class TrackServiceImpl implements TrackService {

    private final TrackRepository trackRepository;
    private final S3Service s3Service;
    private final S3Bucket s3Bucket;
    private final UserService userService;

    public TrackServiceImpl(TrackRepository trackRepository, S3Service s3Service, S3Bucket s3Bucket, UserService userService) {
        this.trackRepository = trackRepository;
        this.s3Service = s3Service;
        this.s3Bucket = s3Bucket;
        this.userService = userService;
    }

    @Override
    @Transactional
    public Track uploadTrack(int userId, Track track, MultipartFile file){
        try {
            userService.checkIfUserExists(userId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        String trackAudioId = UUID.randomUUID().toString();
        String trackCoverId = UUID.randomUUID().toString();

        // upload audio file and cover to AWS S3
        try {
            s3Service.putObject(
                    s3Bucket.getCustomer(),
                    "track-covers/%s".formatted(trackCoverId),
                    file.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        track.setAudioUrl(trackAudioId);
        track.setCoverUrl(trackCoverId);
        return trackRepository.save(track);
    }

    @Override
    @Transactional
    public byte[] getTrack(Integer trackId){
        var track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("track with id [%s] not found".formatted(trackId)));

        return s3Service.getObject(
                s3Bucket.getCustomer(),
                "track-covers/%s".formatted(track.getCoverUrl())
        );
    }

    @Override
    public void delete(int trackId) {
        var track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("track with id [%s] not found".formatted(trackId)));
        s3Service.deleteObject(
                s3Bucket.getCustomer(),
                "track-cover/%s".formatted(track.getCoverUrl())
        );
    }
}
