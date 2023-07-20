package com.zyan.backend.user.repositories;

import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    Optional<User> findByRole(UserRole admin);
    @Query("SELECT DISTINCT u FROM User u JOIN u.profile p where u.id = :userId")
    Object findByIdWithProfile(@Param("userId") int id);

    List<User> findByUsernameContainingIgnoreCase(String query);
}
