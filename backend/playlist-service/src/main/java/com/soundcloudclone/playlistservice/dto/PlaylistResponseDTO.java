package com.soundcloudclone.playlistservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaylistResponseDTO {
    private String name;
    private boolean isPublic;
}