package com.zyan.backend.playlist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist,Integer> {
//    @Query("select distinct p from Playlist p " +
//            "join fetch p.tracks t " +
//            "where p.id = :id")
//    Optional<Playlist> findById(@Param("id") int id);
    List<Playlist> findByNameContainingIgnoreCase(String query);
}
