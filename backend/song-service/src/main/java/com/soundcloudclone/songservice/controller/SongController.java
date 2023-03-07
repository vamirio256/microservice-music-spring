package com.soundcloudclone.songservice.controller;

import com.soundcloudclone.songservice.dto.SongRequestDTO;
import com.soundcloudclone.songservice.dto.SongResponseDTO;
import com.soundcloudclone.songservice.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @GetMapping("")
    public String showHomePage() {
        return "upload";
    }

    @PostMapping("/upload")
    public ResponseEntity<SongResponseDTO> uploadFile(@ModelAttribute SongRequestDTO songRequestDTO) throws IOException {
        SongResponseDTO songResponseDTO = songService.uploadSong(songRequestDTO);
        return ResponseEntity.ok(songResponseDTO);
    }
}
