package com.zyan.backend.playlist;

import com.zyan.backend.track.TrackDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaylistDTO {
    private int id;
    private String name;
    private String coverUrl;
    private Set<TrackDTO> tracks;
}
