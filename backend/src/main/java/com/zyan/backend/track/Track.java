package com.zyan.backend.track;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.user.entities.Profile;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDateTime;
import java.util.List;

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
    private int listenedTime = 0;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isPublic = true;
    @ManyToMany(mappedBy = "tracks")
    @JsonIgnoreProperties("tracks")
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
    private List<Playlist> playlists;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonIgnoreProperties("tracks")
    private Profile profile;

    public TrackDTO mapTrackToTrackDTO() {
        return TrackDTO.builder()
                .id(getId())
                .name(getName())
                .audioUrl(getAudioUrl())
                .coverUrl(getCoverUrl())
                .listenedTime(getListenedTime())
                .user(profile.getUser().mapUserToUserSummaryDTO())
                .build();
    }
}
