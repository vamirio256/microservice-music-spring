import React from 'react'

const PlaylistTrackCard = ({coverUrl, title, artist}) => {
  return (
    <div>
        <img src={coverUrl}/>
        <div>{title}</div>
        <div>{artist}</div>
    </div>
  )
}

export default PlaylistTrackCard