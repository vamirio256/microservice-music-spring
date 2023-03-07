package com.soundcloudclone.songservice.service;

import com.soundcloudclone.songservice.dto.SongRequestDTO;
import com.soundcloudclone.songservice.dto.SongResponseDTO;
import com.soundcloudclone.songservice.model.Song;
import com.soundcloudclone.songservice.repository.SongRepository;
import com.soundcloudclone.songservice.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;

    @Override
    public SongResponseDTO uploadSong(SongRequestDTO songRequestDTO) throws IOException {
        String songUrl = S3Util.uploadFile(songRequestDTO.getSongFile());
        String coverUrl = S3Util.uploadFile(songRequestDTO.getCoverFile());
        Song song = Song.builder()
                .artist(songRequestDTO.getArtist())
                .title(songRequestDTO.getTitle())
                .coverUrl(coverUrl)
                .songUrl(songUrl)
                .build();
        songRepository.save(song);
        log.info("Song {} is saved", song.getId());
        return mapToSongResponseDTO(song);
    }

    private SongResponseDTO mapToSongResponseDTO(Song song) {
        return SongResponseDTO.builder()
                .artist(song.getArtist())
                .title(song.getTitle())
                .coverUrl(song.getCoverUrl())
                .songUrl(song.getSongUrl())
                .build();
    }
}
