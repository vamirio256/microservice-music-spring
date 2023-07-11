package com.zyan.backend.playlist;

import com.zyan.backend.track.Track;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "playlists")
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NonNull
    private String name;
    private boolean isPublic;
    private String coverUrl;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "playlist")
    Set<PlaylistTrack> playlistTracks;
}
