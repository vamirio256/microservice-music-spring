package com.zyan.backend.playlist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zyan.backend.track.entities.Track;
import com.zyan.backend.user.entities.Profile;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "playlists")
public class Playlist {

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "playlists_tracks"
            , joinColumns = @JoinColumn(name = "playlist_id"),
            inverseJoinColumns = @JoinColumn(name = "track_id"))
    @JsonIgnoreProperties("playlists")
    private List<Track> tracks;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NonNull
    private String name;
    private String coverUrl;
    private boolean isPublic = true;
    private LocalDateTime createdAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonIgnoreProperties("playlists")
    private Profile profile;

    public PlaylistDTO mapPlaylistToPlaylistDTO(int profileId) {

        return PlaylistDTO.builder()
                .id(getId())
                .name(getName())
                .tracks(getTracks() != null
                        ? getTracks()
                        .stream()
                        .map(track -> track.mapTrackToTrackSummaryDTO(profileId))
                        .collect(Collectors.toList())
                        : Collections.emptyList())
                .createdAt(getCreatedAt())
                .build();
    }
}
