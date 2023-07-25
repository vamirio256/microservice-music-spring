package com.zyan.backend.track;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.exception.UnauthenticatedUserException;
import com.zyan.backend.playlist.PlaylistDTO;
import com.zyan.backend.s3.S3Bucket;
import com.zyan.backend.s3.S3Service;
import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.track.entities.Comment;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.track.repository.CommentRepository;
import com.zyan.backend.track.repository.TrackRepository;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TrackServiceImpl implements TrackService {

    private final TrackRepository trackRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final S3Bucket s3Bucket;
    private final UserDetailsService userDetailsService;
    private final CommentRepository commentRepository;

    @Value("${AWS_DOMAIN}")
    private String awsDomain;

    public TrackServiceImpl(TrackRepository trackRepository, UserRepository userRepository, S3Service s3Service, S3Bucket s3Bucket, UserDetailsService userDetailsService, CommentRepository commentRepository) {
        this.trackRepository = trackRepository;
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.s3Bucket = s3Bucket;
        this.userDetailsService = userDetailsService;
        this.commentRepository = commentRepository;
    }

    @Override
    @Transactional
    public TrackDTO uploadTrack(Track track, MultipartFile cover, MultipartFile audio) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (email.isEmpty()) {
            throw new UnauthenticatedUserException("Unauthenticated user");
        }

        log.info("email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("user with email '%s' not found".formatted(email)));

//        if (userDetailsService.loadUserByUsername(user.getEmail()) != null)
//            throw new ResourceNotFoundException("user with email '%s' not found".formatted(user.getEmail()));

        String trackCoverId = "track-covers/%s".formatted(UUID.randomUUID().toString());
        String trackAudioId = "track-audio/%s".formatted(UUID.randomUUID().toString());

        // upload audio file and cover to AWS S3
        try {
            //upload cover
            s3Service.putObject(
                    s3Bucket.getCustomer(),
                    trackCoverId,
                    "image/jpeg",
                    cover.getInputStream()
            );
            //upload audio
            s3Service.putObject(
                    s3Bucket.getCustomer(),
                    trackAudioId,
                    "audio/mpeg",
                    audio.getInputStream()
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        track.setProfile(user.getProfile());
        track.setAudioUrl(awsDomain + trackAudioId);
        track.setCoverUrl(awsDomain + trackCoverId);
        track.setUpdatedAt(LocalDateTime.now());
        track.setCreatedAt(LocalDateTime.now());
        return trackRepository.save(track).mapTrackToTrackDTO();
    }

    @Override
    @Transactional
    public byte[] getTrackCover(Integer trackId) {
        var track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("track with id [%s] not found".formatted(trackId)));

        return s3Service.getObject(
                s3Bucket.getCustomer(),
                track.getCoverUrl()
        );
    }

    @Override
    public void deleteTrack(int trackId) {
        var track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("track with id [%s] not found".formatted(trackId)));

        s3Service.deleteObject(
                s3Bucket.getCustomer(),
                track.getCoverUrl().substring(awsDomain.length())
        );
        s3Service.deleteObject(
                s3Bucket.getCustomer(),
                track.getAudioUrl().substring(awsDomain.length())
        );
        trackRepository.deleteById(trackId);
    }

    @Override
    public byte[] streamTrackAudio(Integer id) {
        var track = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("track with id [%s] not found".formatted(id)));

        return s3Service.getObject(
                s3Bucket.getCustomer(),
                track.getAudioUrl()
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
    public TrackDTO getTrack(int id) {
        Track track = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("track with id '%s' not found".formatted(id)));
        return track.mapTrackToTrackDTO();
    }

    @Override
    public List<TrackDTO> search(String query) {
        return trackRepository.findByNameContainingIgnoreCase(query)
                .stream()
                .map(Track::mapTrackToTrackDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void increaseListenedTime(int trackId) {
        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("Track with id '%s' not found".formatted(trackId)));
        track.setListenedTime(track.getListenedTime() + 1);
        trackRepository.save(track);
    }

    @Override
    public PlaylistDTO getLatestTracks() {
        List<TrackDTO> tracks = trackRepository.findLatestTracks()
                .stream()
                .map(Track::mapTrackToTrackDTO)
                .collect(Collectors.toList());
        return PlaylistDTO.builder()
                .name("Latest Tracks")
                .tracks(tracks)
                .build();
    }

    @Override
    public PlaylistDTO getPopularTracks() {
        List<TrackDTO> tracks = trackRepository.findPopularTracks()
                .stream()
                .map(Track::mapTrackToTrackDTO)
                .collect(Collectors.toList());
        return PlaylistDTO.builder()
                .name("Popular Tracks")
                .tracks(tracks)
                .build();
    }

    @Override
    public void postComment(int trackId, String context) {
        Profile profile = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getProfile();

        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("Track with id '%s' not found.".formatted(trackId)));

        Comment comment = Comment.builder()
                .profile(profile)
                .track(track)
                .context(context)
                .addedAt(LocalDateTime.now())
                .build();
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(int commentId) {
        commentRepository.deleteById(commentId);
    }
}


