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
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
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
    public TrackDTO uploadTrack(User user, Track track, MultipartFile cover, MultipartFile audio) {
        String email = user.getEmail();

        if (email.isEmpty()) {
            throw new UnauthenticatedUserException("Unauthenticated user");
        }

        Profile profile = userRepository.findByEmail(email).get().getProfile();

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
        track.setProfile(profile);
        track.setAudioUrl(awsDomain + trackAudioId);
        track.setCoverUrl(awsDomain + trackCoverId);
        track.setUpdatedAt(LocalDateTime.now());
        track.setCreatedAt(LocalDateTime.now());
        return trackRepository.save(track).mapTrackToTrackDTO(user.getProfile().getId());
    }

    @Override
    public void deleteTrack(User user, int trackId) {
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
    @Transactional
    public Track updateTrack(User user, Track track, MultipartFile cover, MultipartFile audio) {
        Track updatedTrack = trackRepository.findById(track.getId())
                .orElseThrow(() -> new ResourceNotFoundException("track with id '%s' not found".formatted(track.getId())));

        if (updatedTrack.getProfile().getId() != user.getId()) {
            throw new BadCredentialsException("not being updated by original user");
        }

        updatedTrack.setName(track.getName());
        updatedTrack.setUpdatedAt(LocalDateTime.now());

        return trackRepository.save(updatedTrack);
    }

    @Override
    public TrackDTO getTrack(User user, int id) {
        Track track = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("track with id '%s' not found".formatted(id)));
        return track.mapTrackToTrackDTO(user.getId());
    }

    @Override
    public List<TrackDTO> search(User user, String query) {
        return trackRepository.findByNameContainingIgnoreCase(query)
                .stream()
                .map(track -> track.mapTrackToTrackDTO(user.getId()))
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
    public PlaylistDTO getLatestTracks(User user) {
        return PlaylistDTO.builder()
                .name("Latest Tracks")
                .tracks(trackRepository.findLatestTracks()
                        .stream()
                        .map(track -> track.mapTrackToTrackSummaryDTO(user.getId()))
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public PlaylistDTO getPopularTracks(User user) {
        return PlaylistDTO.builder()
                .name("Popular Tracks")
                .tracks(trackRepository.findLatestTracks()
                        .stream()
                        .map(track -> track.mapTrackToTrackSummaryDTO(user.getId()))
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public void postComment(User user, int trackId, String context) {
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
    public void deleteComment(User user, int commentId) {
        commentRepository.deleteById(commentId);
    }
}


