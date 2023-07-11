package com.zyan.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Set<Follow> findByFollowedId (int id);
    Set<Follow> findByFollowingId (int id);
}
