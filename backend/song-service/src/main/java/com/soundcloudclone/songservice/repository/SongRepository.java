package com.soundcloudclone.songservice.repository;

import com.soundcloudclone.songservice.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song,Long> {
}
