package com.zyan.backend.playlist;

import com.zyan.backend.playlist_track.PlaylistTrack;
import com.zyan.backend.user.entities.Profile;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "playlists")
public class Playlist {

    @OneToMany(mappedBy = "playlist")
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
    Set<PlaylistTrack> playlistTracks;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NonNull
    private String name;
    private boolean isPublic;
    private String coverUrl;
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

//    public PlaylistDTO mapPlaylistToPlaylistDTO(){
//        PlaylistDTO dto = new PlaylistDTO();
//        dto.setId(getId());
//        dto.setName(getName());
//        // Set other properties of the DTO as needed
//        dto.setTracks(getTracks().stream()
//                .map(Track::mapTrackToDto)
//                .collect(Collectors.toSet()));
//        return dto;
////        return PlaylistDTO.builder()
////                .name(getName())
////                .coverUrl(getCoverUrl())
////                .tracks(getPlaylistTracks().stream().map(Track::mapTrackToTrackDTO))
////                .build();
//    }
}
