package com.zyan.backend.user.repositories;

import com.zyan.backend.user.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    
}
