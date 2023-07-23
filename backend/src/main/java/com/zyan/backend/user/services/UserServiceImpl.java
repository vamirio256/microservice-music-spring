package com.zyan.backend.user.services;

import com.zyan.backend.auth.RegisterRequestDTO;
import com.zyan.backend.exception.MethodArgumentTypeMismatchException;
import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.track.repository.TrackRepository;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.entities.*;
import com.zyan.backend.user.repositories.FavoriteTrackRepository;
import com.zyan.backend.user.repositories.FollowRepository;
import com.zyan.backend.user.repositories.ProfileRepository;
import com.zyan.backend.user.repositories.UserRepository;
import jakarta.persistence.EntityExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final FollowRepository followRepository;
    private final TrackRepository trackRepository;
    private final FavoriteTrackRepository favoriteTrackRepository;

    public UserServiceImpl(UserRepository userRepository, ProfileRepository profileRepository, FollowRepository followRepository, TrackRepository trackRepository, FavoriteTrackRepository favoriteTrackRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.followRepository = followRepository;
        this.trackRepository = trackRepository;
        this.favoriteTrackRepository = favoriteTrackRepository;
    }

    //    @PostConstruct
    public void createAdmin() {
        if (userRepository.findByRole(UserRole.ADMIN).isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@gmail.com")
                    .password(new BCryptPasswordEncoder().encode("admin"))
                    .build();
            userRepository.save(admin);
        }
    }

    @Override
    public UserDTO createUser(RegisterRequestDTO request) {
        Optional<User> existUser = userRepository.findByEmail(request.getEmail());
        if (existUser.isPresent()) {
            throw new EntityExistsException("User with email '%s' already exist".formatted(request.getEmail()));
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .role(UserRole.USER)
                .password(new BCryptPasswordEncoder().encode(request.getPassword()))
                .build();
        log.info(user.toString());
        return userRepository.save(user).mapUserToUserDTO();
    }

    @Override
    public boolean checkIfEmailExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDTO findById(int userId) {
        User user = userRepository.findById(userId);
        return user.mapUserToUserDTO();
    }

    @Override
    public void followUser(int followedId) {
        int followingId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        if (followingId == followedId) {
            throw new MethodArgumentTypeMismatchException("Following and followed user can not be the same");
        }


        Profile followingProfile = userRepository.findById(followingId).getProfile();
//                .orElseThrow(() -> new ResourceNotFoundException("Profile with id '%s' not found".formatted(followedId)));
        Profile followedProfile = userRepository.findById(followedId).getProfile();
//                .orElseThrow(() -> new ResourceNotFoundException("Profile with id '%s' not found".formatted(followedId)));
        Follow follow = Follow.builder()
                .id(new FollowId(followedProfile.getId(), followingProfile.getId()))
                .following(followingProfile)
                .followed(followedProfile)
                .addedAt(LocalDateTime.now())
                .build();

        followRepository.save(follow);
    }

    @Override
    public void unfollowUser(int followedId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication();

        if (user.getId() == followedId) {
            throw new MethodArgumentTypeMismatchException("Following and followed user can not be the same");
        }


        Profile followingProfile = user.getProfile();
        Profile followedProfile = profileRepository.findById(followedId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile with id '%s' not found".formatted(followedId)));

        Follow follow = Follow.builder()
                .id(new FollowId(followedProfile.getId(), followingProfile.getId()))
                .following(followingProfile)
                .followed(followedProfile)
                .build();

        followRepository.delete(follow);
    }

    @Override
    public void addFavoriteTrack(int trackId) {
        Profile profile = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getProfile();

        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("Track with id '%s' not found.".formatted(trackId)));

        if(profile.getFavoriteTracks().stream()
                .anyMatch(tracks -> tracks.getTrack().equals(track))){
            throw new IllegalStateException("Track is already favorite by user");
        }

        FavoriteTrack favoriteTrack = FavoriteTrack.builder()
                .id(new FavoriteTrackId(trackId, profile.getId()))
                .profile(profile)
                .track(track)
                .addedAt(LocalDateTime.now())
                .build();
        favoriteTrackRepository.save(favoriteTrack);
    }

    public void removeFavoriteTrack(int trackId) {
        Profile profile = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getProfile();

        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("Track with id '%s' not found.".formatted(trackId)));

        FavoriteTrack favoriteTrack = FavoriteTrack.builder()
                .id(new FavoriteTrackId(trackId, profile.getId()))
                .profile(profile)
                .track(track)
                .build();
        favoriteTrackRepository.delete(favoriteTrack);
    }
}
