import React from 'react'

const PlaylistTrackCard = ({coverUrl, title, artist}) => {
  return (
    <div>
        <img src={coverUrl} className='h-[-20px] w-[20px] '/>
        <div>{title}</div>
        <div>{artist}</div>
    </div>
  )
}

export default PlaylistTrackCard