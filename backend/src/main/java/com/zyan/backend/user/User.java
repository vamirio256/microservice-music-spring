package com.zyan.backend.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.zyan.backend.playlist.PlaylistTrack;
import com.zyan.backend.track.Track;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

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
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @JsonIgnoreProperties("user")
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Track> tracks;

    @OneToMany(mappedBy = "followed", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Follow> followed;

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Follow> following;

    public UserDTO mapUserToUserDTO(){
        return UserDTO.builder()
                .id(id)
                .username(username)
                .email(email)
                .roles(role)
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
        return true;
    }
}
