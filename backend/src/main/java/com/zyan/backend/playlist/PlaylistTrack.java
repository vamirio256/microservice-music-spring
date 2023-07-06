package com.zyan.backend.playlist;

import com.zyan.backend.track.Track;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
public class PlaylistTrack {

    @EmbeddedId
    private PlaylistTrackId id;

    @ManyToOne
    @MapsId("playlistId")
    private Playlist playlist;

    @ManyToOne
    @MapsId("trackId")
    private Track track;

    private LocalDateTime addedAt;
}

@Embeddable
class PlaylistTrackId implements Serializable{
    private int playlistId;
    private int trackId;
}