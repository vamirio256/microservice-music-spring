package com.soundcloudclone.songservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongRequestDTO {
    private String title;
    private String artist;
    private MultipartFile songFile;
    private MultipartFile coverFile;
}
