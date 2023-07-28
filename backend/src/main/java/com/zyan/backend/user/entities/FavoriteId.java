package com.zyan.backend.user.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class FavoriteId implements Serializable {
    @Column(name = "track_id")
    private int trackId;
    @Column(name = "profile_id")
    private int profileId;
}
