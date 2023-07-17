package com.zyan.backend.user.entities;

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
    private Profile followed;

    @ManyToOne
    @MapsId("followingId")
    private Profile following;

    private LocalDateTime addedAt;
}

@Embeddable
class FollowId implements Serializable {
    private int followedId;
    private int followingId;
}
