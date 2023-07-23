package com.zyan.backend.user.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.UserRole;
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

    @NonNull
    @JsonIgnore
    private String password;
    private String avatarUrl;
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("user")
    private Profile profile;

    public UserDTO mapUserToUserDTO(){
        return UserDTO.builder()
                .id(id)
                .username(username)
                .avatarUrl(getAvatarUrl())
                .email(email)
                .roles(role)
                .profile(getProfile().mapProfileToProfileDTO())
                .build();
    }

    public UserSummaryDTO mapUserToUserSummaryDTO(){
        return UserSummaryDTO.builder()
                .id(id)
                .username(username)
                .email(email)
                .build();
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                // Exclude circular reference to Profile in toString()
                '}';
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
        return true;
    }
}
