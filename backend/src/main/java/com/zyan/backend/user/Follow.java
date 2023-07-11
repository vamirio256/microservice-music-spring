package com.zyan.backend.user;

import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.track.Track;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "follows")
public class Follow {

    @EmbeddedId
    private FollowId id;

    @ManyToOne
    @MapsId("followedId")
    private User followed;

    @ManyToOne
    @MapsId("followingId")
    private User following;

    private LocalDateTime addedAt;
}

@Embeddable
class FollowId implements Serializable {
    private int followedId;
    private int followingId;
}
