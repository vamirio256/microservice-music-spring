package com.zyan.backend.user;

import com.zyan.backend.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    Optional<User> findByRole(UserRole admin);

    List<User> findByUsernameContainingIgnoreCase(String query);
}
