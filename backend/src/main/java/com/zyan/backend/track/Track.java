package com.zyan.backend.track;


import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.playlist.PlaylistTrack;
import com.zyan.backend.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table (name = "tracks")
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull(message = "Track name is required")
    private String name;
    private String coverId;
    private String audioId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isPublic;
    @OneToMany(mappedBy = "track")
    private Set<PlaylistTrack> playlistTracks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;
}
