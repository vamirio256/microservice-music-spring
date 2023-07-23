package com.zyan.backend.user.entities;

import com.zyan.backend.track.dto.TrackDTO;
import com.zyan.backend.track.entities.Track;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "favorites")
public class FavoriteTrack {

    @EmbeddedId
    private FavoriteTrackId id;

    @ManyToOne
    @MapsId("trackId")
    @JoinColumn(name="track_id")
    private Track track;

    @ManyToOne
    @MapsId("profileId")
    @JoinColumn(name="profile_id")
    private Profile profile;

    private LocalDateTime addedAt;

    public TrackDTO mapFavoriteTrackToTrackDTO(){
        return getTrack().mapTrackToTrackDTO();
    }
}


