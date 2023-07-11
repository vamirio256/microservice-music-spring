package com.zyan.backend.search;

import com.zyan.backend.playlist.Playlist;
import com.zyan.backend.track.Track;
import com.zyan.backend.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchResponseDTO {
    private List<Track> tracks;
    private List<UserDTO> users;
    private List<Playlist> playlists;
}
