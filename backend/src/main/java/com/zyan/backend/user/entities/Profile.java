package com.zyan.backend.user.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.user.dto.ProfileDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("profile")
    private User user;
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"profile", "playlists"})
    private List<Track> tracks;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"profile"})
    private List<Playlist> playlists;

    @OneToMany(mappedBy = "followed", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("profile")
    private List<Follow> followed;

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("profile")
    private List<Follow> following;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FavoriteTrack> favoriteTracks;

    @Override
    public String toString() {
        return "Profile{" +
                "id=" + id +
                // Exclude circular reference to User in toString()
                '}';
    }

    public ProfileDTO mapProfileToProfileDTO() {
        return ProfileDTO.builder()
                .tracks(getTracks().stream()
                        .map(Track::mapTrackToTrackDTO)
                        .collect(Collectors.toList()))
                .playlists(getPlaylists().stream()
                        .map(Playlist::mapPlaylistToPlaylistDTO)
                        .collect(Collectors.toList()))
                .follow(getFollowing().stream()
                        .map(Follow::mapFollowToFollowDTO)
                        .collect(Collectors.toList()))
                .favoriteTracks(getFavoriteTracks().stream()
                        .map(FavoriteTrack::mapFavoriteTrackToTrackDTO)
                        .collect(Collectors.toList()))
                .build();
    }
}
