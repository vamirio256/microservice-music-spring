package com.soundcloudclone.songservice.repository;

import com.soundcloudclone.songservice.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song,Long> {
}
