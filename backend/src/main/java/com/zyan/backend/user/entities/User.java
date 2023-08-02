package com.zyan.backend.user.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.dto.UserSummaryDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NonNull
    private String username;

    @NonNull
    private String email;

    @JsonIgnore
    private String password;
    private String avatarUrl;
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;
    private boolean enabled;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("user")
    private Profile profile;

    public UserDTO mapUserToUserDTO(int profileId) {
        boolean isFollowing = getProfile().getFollowed()
                .stream()
                .anyMatch(followed -> followed.getId().getFollowedId() == profileId);

        return UserDTO.builder()
                .id(id)
                .username(username)
                .avatarUrl(getAvatarUrl())
                .email(email)
                .roles(role)
                .isFollowing(isFollowing)
                .profile(getProfile().mapProfileToProfileDTO(profileId))
                .build();
    }

    public UserSummaryDTO mapUserToUserSummaryDTO(int profileId) {
        boolean isFollowing = getProfile().getFollowed()
                .stream()
                .anyMatch(followed -> followed.getId().getFollowedId() == profileId);

        return UserSummaryDTO.builder()
                .id(id)
                .username(username)
                .email(email)
                .avatarUrl(avatarUrl)
                .isFollowing(isFollowing)
                .build();
    }

    public UserSummaryDTO mapUserToUserSummaryDTO() {
        boolean isFollowing = getProfile().getFollowed()
                .stream()
                .anyMatch(followed -> followed.getId().getFollowedId() == getProfile().getId());

        return UserSummaryDTO.builder()
                .id(id)
                .username(username)
                .email(email)
                .avatarUrl(avatarUrl)
                .isFollowing(isFollowing)
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
