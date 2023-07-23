package com.zyan.backend.track.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.user.entities.FavoriteTrack;
import com.zyan.backend.user.entities.Profile;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "tracks")
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull(message = "Track name is required")
    private String name;
    private String coverUrl;
    private String audioUrl;
    private int duration;
    private int listenedTime = 0;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isPublic = true;
    @ManyToMany(mappedBy = "tracks")
//    @JsonIgnoreProperties("tracks")
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
    private List<Playlist> playlists;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonIgnoreProperties("tracks")
    private Profile profile;

    @OneToMany(mappedBy = "track", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FavoriteTrack> isFavorited;

    @OneToMany(mappedBy = "track", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> isCommented;

    public TrackDTO mapTrackToTrackDTO() {
        return TrackDTO.builder()
                .id(getId())
                .name(getName())
                .audioUrl(getAudioUrl())
                .coverUrl(getCoverUrl())
                .listenedTime(getListenedTime())
                .user(profile.getUser().mapUserToUserSummaryDTO())
                .comments(getIsCommented().stream()
                        .map(Comment::mapCommentToCommentDTO)
                        .collect(Collectors.toList()))
                .build();
    }
}
