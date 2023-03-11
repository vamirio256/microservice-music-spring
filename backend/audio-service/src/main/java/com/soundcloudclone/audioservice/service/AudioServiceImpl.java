package com.soundcloudclone.audioservice.service;

import com.soundcloudclone.audioservice.dto.AudioRequestDTO;
import com.soundcloudclone.audioservice.dto.AudioResponseDTO;
import com.soundcloudclone.audioservice.entity.Audio;
import com.soundcloudclone.audioservice.repository.AudioRepository;
import com.soundcloudclone.audioservice.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
public class AudioServiceImpl implements AudioService {

    private final AudioRepository audioRepository;
    private final S3Util s3Util;

    @Override
    public AudioResponseDTO uploadAudio(AudioRequestDTO audioRequestDTO) throws IOException {
        String audioUrl = s3Util.uploadFile(audioRequestDTO.getAudioFile());
        String coverUrl = s3Util.uploadFile(audioRequestDTO.getCoverFile());
        Audio audio = Audio.builder()
                .artist(audioRequestDTO.getArtist())
                .title(audioRequestDTO.getTitle())
                .coverUrl(coverUrl)
                .audioUrl(audioUrl)
                .build();
        audioRepository.save(audio);
        log.info(audio.toString());
        log.info("Song {} is saved", audio.getId());
        return mapToSongResponseDTO(audio);
    }

    @Override
    public byte[] streamAudio(Long id) {
        Audio audio = audioRepository.findById(id).orElse(null);
        return s3Util.streamFile(audio != null ? audio.getAudioUrl() : null);
    }

    private AudioResponseDTO mapToSongResponseDTO(Audio audio) {
        return AudioResponseDTO.builder()
                .artist(audio.getArtist())
                .title(audio.getTitle())
                .coverUrl(audio.getCoverUrl())
                .audioUrl(audio.getAudioUrl())
                .build();
    }
}
