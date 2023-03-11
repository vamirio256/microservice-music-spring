package com.soundcloudclone.audioservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AudioResponseDTO {
    private String title;
    private String artist;
    private String audioUrl;
    private String coverUrl;
}
