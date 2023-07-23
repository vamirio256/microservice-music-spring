package com.zyan.backend.user.repositories;

import com.zyan.backend.user.entities.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
}
