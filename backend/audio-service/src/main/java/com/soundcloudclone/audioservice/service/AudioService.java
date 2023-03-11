package com.soundcloudclone.audioservice.service;

import com.soundcloudclone.audioservice.dto.AudioRequestDTO;
import com.soundcloudclone.audioservice.dto.AudioResponseDTO;

import java.io.IOException;

public interface AudioService {
    AudioResponseDTO uploadAudio(AudioRequestDTO audioRequestDTO) throws IOException;

    byte[] streamAudio(Long id);
}
