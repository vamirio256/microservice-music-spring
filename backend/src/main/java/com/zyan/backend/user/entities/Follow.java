package com.zyan.backend.user.entities;

import com.zyan.backend.user.dto.FollowDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Builder
@Data
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

    public FollowDTO mapFollowToFollowDTO() {
        return FollowDTO.builder()
                .following(getFollowing().getUser().mapUserToUserSummaryDTO())
                .followed(getFollowed().getUser().mapUserToUserSummaryDTO())
                .addedAt(getAddedAt())
                .build();
    }
}

@Embeddable
class FollowId implements Serializable {
    private int followedId;
    private int followingId;
}
