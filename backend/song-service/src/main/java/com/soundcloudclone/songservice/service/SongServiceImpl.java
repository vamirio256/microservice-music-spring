package com.soundcloudclone.songservice.service;

import com.soundcloudclone.songservice.dto.SongRequestDTO;
import com.soundcloudclone.songservice.dto.SongResponseDTO;
import com.soundcloudclone.songservice.entity.Song;
import com.soundcloudclone.songservice.repository.SongRepository;
import com.soundcloudclone.songservice.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final S3Util s3Util;

    @Override
    public SongResponseDTO uploadSong(SongRequestDTO songRequestDTO) throws IOException {
        String songUrl = s3Util.uploadFile(songRequestDTO.getSongFile());
        String coverUrl = s3Util.uploadFile(songRequestDTO.getCoverFile());
        Song song = Song.builder()
                .artist(songRequestDTO.getArtist())
                .title(songRequestDTO.getTitle())
                .coverUrl(coverUrl)
                .songUrl(songUrl)
                .build();
        songRepository.save(song);
        log.info(song.toString());
        log.info("Song {} is saved", song.getId());
        return mapToSongResponseDTO(song);
    }

    @Override
    public byte[] streamSong(Long id) {
        Song song = songRepository.findById(id).orElse(null);
        return s3Util.streamFile(song != null ? song.getSongUrl() : null);
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
