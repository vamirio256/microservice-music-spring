package com.zyan.backend.user.entities;

import com.zyan.backend.user.dto.FollowDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
                .user(getFollowed().getUser().mapUserToUserSummaryDTO())
                .addedAt(getAddedAt())
                .build();
    }
}

