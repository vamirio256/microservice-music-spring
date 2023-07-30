package com.zyan.backend.user.services;

import com.zyan.backend.auth.RegisterRequestDTO;
import com.zyan.backend.exception.MethodArgumentTypeMismatchException;
import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.s3.S3Bucket;
import com.zyan.backend.s3.S3Service;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.track.repository.TrackRepository;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.dto.UserSummaryDTO;
import com.zyan.backend.user.entities.*;
import com.zyan.backend.user.repositories.FavoriteTrackRepository;
import com.zyan.backend.user.repositories.FollowRepository;
import com.zyan.backend.user.repositories.ProfileRepository;
import com.zyan.backend.user.repositories.UserRepository;
import jakarta.persistence.EntityExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final FollowRepository followRepository;
    private final TrackRepository trackRepository;
    private final FavoriteTrackRepository favoriteTrackRepository;
    private final S3Service s3Service;
    private final S3Bucket s3Bucket;
    @Value("${AWS_DOMAIN}")
    private String awsDomain;

    public UserServiceImpl(UserRepository userRepository, ProfileRepository profileRepository, FollowRepository followRepository, TrackRepository trackRepository, FavoriteTrackRepository favoriteTrackRepository, S3Service s3Service, S3Bucket s3Bucket) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.followRepository = followRepository;
        this.trackRepository = trackRepository;
        this.favoriteTrackRepository = favoriteTrackRepository;
        this.s3Service = s3Service;
        this.s3Bucket = s3Bucket;
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
        return userRepository.save(user).mapUserToUserDTO(user.getProfile().getId());
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
        if(user == null){
            throw new ResourceNotFoundException("user with id '%s' not found".formatted(userId));
        }
        return user.mapUserToUserDTO(user.getProfile().getId());
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

//        if(profile.getFavoriteTracks().stream()
//                .anyMatch(tracks -> tracks.getTrack().equals(track))){
//            throw new IllegalStateException("Track is already favorite by user");
//        }

        Favorite favorite = Favorite.builder()
                .id(new FavoriteId(trackId, profile.getId()))
                .profile(profile)
                .track(track)
                .addedAt(LocalDateTime.now())
                .build();
        favoriteTrackRepository.save(favorite);
    }

    public void removeFavoriteTrack(int trackId) {
        Profile profile = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getProfile();

        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new ResourceNotFoundException("Track with id '%s' not found.".formatted(trackId)));

        Favorite favorite = Favorite.builder()
                .id(new FavoriteId(trackId, profile.getId()))
                .profile(profile)
                .track(track)
                .addedAt(LocalDateTime.now())
                .build();
        favoriteTrackRepository.delete(favorite);
    }

    @Override
    public UserDTO updateUserAvatar(MultipartFile avatar) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userAvatarId = "user-avatars/%s".formatted(UUID.randomUUID().toString());
        try {

            if (!user.getAvatarUrl().equals("https://vamirio-soundcloud-clone.s3.ap-southeast-1.amazonaws.com/user-avatar/user_avatar.jpg")) {
                String deleteUserAvatarId = "user-avatars/%s".formatted(UUID.randomUUID().toString());
                s3Service.deleteObject(
                        s3Bucket.getCustomer(),
                        deleteUserAvatarId
                );
            }
            s3Service.putObject(
                    s3Bucket.getCustomer(),
                    userAvatarId,
                    "image/jpeg",
                    avatar.getInputStream()
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        user.setAvatarUrl(awsDomain + userAvatarId);
        return userRepository.save(user).mapUserToUserDTO(user.getProfile().getId());
    }

    @Override
    public List<UserSummaryDTO> recommendUsers(User user) {
        return userRepository.getRandomUser(user.getId()).stream()
                .map(User::mapUserToUserSummaryDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<Favorite> getFavoriteTracks(User user) {
        return favoriteTrackRepository.findByProfileId(user.getId());
    }
}
