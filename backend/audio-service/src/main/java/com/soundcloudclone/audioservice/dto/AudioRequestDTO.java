package com.soundcloudclone.audioservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AudioRequestDTO {
    private String title;
    private String artist;
    private MultipartFile audioFile;
    private MultipartFile coverFile;
}
