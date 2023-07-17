package com.zyan.backend.user.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.track.Track;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Track> tracks;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Playlist> playlists;

    @OneToMany(mappedBy = "followed", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Follow> followed;

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Follow> following;

    @Override
    public String toString() {
        return "Profile{" +
                "id=" + id +
                // Exclude circular reference to User in toString()
                '}';
    }
}
