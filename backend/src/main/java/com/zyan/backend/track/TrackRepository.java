package com.zyan.backend.track;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TrackRepository extends JpaRepository<Track, Integer> {
    @Query("SELECT t FROM Track t JOIN FETCH t.user WHERE t.id = :id")
    Optional<Track> findByIdWithUser(@Param("id") int id);

    List<Track> findByNameContainingIgnoreCase(String query);
}
