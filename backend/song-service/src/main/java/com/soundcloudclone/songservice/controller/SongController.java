package com.soundcloudclone.songservice.controller;

import com.soundcloudclone.songservice.dto.SongRequestDTO;
import com.soundcloudclone.songservice.dto.SongResponseDTO;
import com.soundcloudclone.songservice.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/song")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @GetMapping("/{id}")
    public ResponseEntity<Resource> streamSong(@PathVariable Long id) {
        byte[] byteArray = songService.streamSong(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentLength(byteArray.length);
        InputStreamResource inputStreamResource = new InputStreamResource(new ByteArrayInputStream(byteArray));
        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .body(inputStreamResource);
    }

    @PostMapping
    public ResponseEntity<SongResponseDTO> uploadSong(@ModelAttribute SongRequestDTO songRequestDTO) throws IOException {
        SongResponseDTO songResponseDTO = songService.uploadSong(songRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(songResponseDTO);
    }
}
