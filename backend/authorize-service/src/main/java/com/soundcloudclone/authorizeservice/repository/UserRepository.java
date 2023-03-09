package com.soundcloudclone.authorizeservice.repository;

import com.soundcloudclone.authorizeservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
