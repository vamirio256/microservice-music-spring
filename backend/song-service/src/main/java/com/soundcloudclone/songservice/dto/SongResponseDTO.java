package com.soundcloudclone.songservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongResponseDTO {
    private String title;
    private String artist;
    private String songUrl;
    private String coverUrl;
}
