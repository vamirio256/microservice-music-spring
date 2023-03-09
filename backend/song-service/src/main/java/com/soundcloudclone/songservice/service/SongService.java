package com.soundcloudclone.songservice.service;

import com.soundcloudclone.songservice.dto.SongRequestDTO;
import com.soundcloudclone.songservice.dto.SongResponseDTO;
import org.springframework.core.io.InputStreamResource;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SongService {
    SongResponseDTO uploadSong(SongRequestDTO songRequestDTO) throws IOException;

    byte[] streamSong(Long id);
}
