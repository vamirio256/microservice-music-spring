package com.zyan.backend.track;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.exception.UnauthenticatedUserException;
import com.zyan.backend.s3.S3Bucket;
import com.zyan.backend.s3.S3Service;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class TrackServiceImpl implements TrackService {

    private final TrackRepository trackRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final S3Bucket s3Bucket;
    private final UserDetailsService userDetailsService;

    public TrackServiceImpl(TrackRepository trackRepository, UserRepository userRepository, S3Service s3Service, S3Bucket s3Bucket, UserDetailsService userDetailsService) {
        this.trackRepository = trackRepository;
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.s3Bucket = s3Bucket;
        this.userDetailsService = userDetailsService;
    }

    @Override
    @Transactional
    public Track uploadTrack(Track track, MultipartFile cover, MultipartFile audio, MultipartFile waveform) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (email.isEmpty()) {
            throw new UnauthenticatedUserException("Unauthenticated user");
        }

        log.info("email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("user with email '%s' not found".formatted(email)));

//        if (userDetailsService.loadUserByUsername(user.getEmail()) != null)
//            throw new ResourceNotFoundException("user with email '%s' not found".formatted(user.getEmail()));

        String trackAudioId = UUID.randomUUID().toString();
        String trackCoverId = UUID.randomUUID().toString();
        String trackWaveformId = UUID.randomUUID().toString();

        // upload audio file and cover to AWS S3
        try {
            //upload cover
            s3Service.putObject(
                    s3Bucket.getCustomer(),
                    "track-covers/%s".formatted(trackCoverId),
                    cover.getBytes()
            );
            //upload audio
            s3Service.putObject(
                    s3Bucket.getCustomer(),
                    "track-audio/%s".formatted(trackAudioId),
                    audio.getBytes()
            );
            s3Service.putObject(
                    s3Bucket.getCustomer(),
                    "track-audio/%s".formatted(trackAudioId),
                    audio.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        track.setProfile(user.getProfile());
        track.setAudioUrl(trackAudioId);
        track.setCoverUrl(trackCoverId);
        return trackRepository.save(track);
    }

    @Override
    @Transactional
    public byte[] getTrackCover(Integer trackId) {
        var track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("track with id [%s] not found".formatted(trackId)));

        return s3Service.getObject(
                s3Bucket.getCustomer(),
                "track-covers/%s".formatted(track.getCoverUrl())
        );
    }

    @Override
    public void deleteTrack(int trackId) {
        var track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("track with id [%s] not found".formatted(trackId)));

        s3Service.deleteObject(
                s3Bucket.getCustomer(),
                "track-cover/%s".formatted(track.getCoverUrl())
        );
        s3Service.deleteObject(
                s3Bucket.getCustomer(),
                "track-audio/%s".formatted(track.getAudioUrl())
        );
        trackRepository.deleteById(trackId);
    }

    @Override
    public byte[] streamTrackAudio(Integer id) {
        var track = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("track with id [%s] not found".formatted(id)));

        return s3Service.getObject(
                s3Bucket.getCustomer(),
                "track-audio/%s".formatted(track.getAudioUrl())
        );
    }

    @Override
    @Transactional
    public Track updateTrack(UserDTO userDTO, Track track, MultipartFile cover, MultipartFile audio, MultipartFile waveform) {

        if (userDetailsService.loadUserByUsername(userDTO.getEmail()) != null)
            throw new ResourceNotFoundException("user with email %s not found".formatted(userDTO.getEmail()));

        Track updatedTrack = trackRepository.findById(track.getId())
                .orElseThrow(() -> new ResourceNotFoundException("track with id '%s' not found".formatted(track.getId())));

        updatedTrack.setName(track.getName());
        updatedTrack.setUpdatedAt(LocalDateTime.now());

        return trackRepository.save(updatedTrack);
    }

    @Override
    public Track getTrack(int id) {
        return trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("track with id '%s' not found".formatted(id)));
    }

    @Override
    public List<Track> search(String query) {
        return trackRepository.findByNameContainingIgnoreCase(query);
    }
}


