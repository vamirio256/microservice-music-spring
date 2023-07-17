package com.zyan.backend.playlist_track;

import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.track.Track;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "playlists_tracks")
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
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlaylistTrackId that = (PlaylistTrackId) o;
        return playlistId == that.playlistId &&
                trackId == that.trackId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(playlistId, trackId);
    }
}