package com.zyan.backend.track;


import com.zyan.backend.playlist_track.PlaylistTrack;
import com.zyan.backend.user.entities.Profile;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDateTime;
import java.util.Set;

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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isPublic;
    @OneToMany(mappedBy = "track")
    @JsonIgnore
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
    private Set<PlaylistTrack> playlistTracks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    public TrackDTO mapTrackToTrackDTO (){
        return TrackDTO.builder()
                .name(getName())
                .audioUrl(getAudioUrl())
                .coverUrl(getCoverUrl())
                .build();
    }
}
