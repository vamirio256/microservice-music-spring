package com.soundcloudclone.audioservice.repository;

import com.soundcloudclone.audioservice.entity.Audio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AudioRepository extends JpaRepository<Audio,Long> {
}
