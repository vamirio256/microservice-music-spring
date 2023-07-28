package com.zyan.backend.user.repositories;

import com.zyan.backend.user.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteTrackRepository extends JpaRepository<Favorite, Integer> {
    @Query("SELECT f FROM Favorite f where f.id.profileId = :profileId")
    List<Favorite> findByProfileId(@Param("profileId") int profileId);
}
