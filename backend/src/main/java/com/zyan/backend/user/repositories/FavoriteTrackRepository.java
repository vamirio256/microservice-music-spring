package com.zyan.backend.user.repositories;

import com.zyan.backend.user.entities.FavoriteTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteTrackRepository extends JpaRepository<FavoriteTrack, Integer> {
}
