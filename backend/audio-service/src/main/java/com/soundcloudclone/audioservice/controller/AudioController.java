package com.soundcloudclone.audioservice.controller;

import com.soundcloudclone.audioservice.dto.AudioRequestDTO;
import com.soundcloudclone.audioservice.dto.AudioResponseDTO;
import com.soundcloudclone.audioservice.service.AudioService;
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
@RequestMapping("/api/audio")
@RequiredArgsConstructor
public class AudioController {

    private final AudioService audioService;

    @GetMapping("/{id}")
    public ResponseEntity<Resource> streamAudio(@PathVariable Long id) {
        byte[] byteArray = audioService.streamAudio(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentLength(byteArray.length);
        InputStreamResource inputStreamResource = new InputStreamResource(new ByteArrayInputStream(byteArray));
        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .body(inputStreamResource);
    }

    @PostMapping
    public ResponseEntity<AudioResponseDTO> uploadAudio(@ModelAttribute AudioRequestDTO audioRequestDTO) throws IOException {
        AudioResponseDTO audioResponseDTO = audioService.uploadAudio(audioRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(audioResponseDTO);
    }
}
