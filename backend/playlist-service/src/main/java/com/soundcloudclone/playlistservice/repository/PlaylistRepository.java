package com.soundcloudclone.playlistservice.repository;

import com.soundcloudclone.playlistservice.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
}
