import React from 'react'
import Playlist from '../../../components/playlist/Playlist'

const PlaylistTab = ({playlists}) => {


  return (
    <div>
        {
            playlists.map((playlist, index)=>(
                <Playlist playlist={playlist} />
            ))
        }
    </div>
  )
}

export default PlaylistTab