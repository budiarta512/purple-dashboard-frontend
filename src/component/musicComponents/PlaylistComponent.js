import React from 'react'
import Loader from '../Loader'

function PlaylistComponent(props) {
  
  if(props.loading) {
    return (
      <div className="w-full h-full">
        <Loader position="transform -translate-y-24" />
      </div>
    )
  }
  else if(!props.playlist.id) {
    return (
      <div className="w-full h-full flex justify-center mt-6">
        <div>
          <button type="button" onClick={()=> props.createPlaylist()} className="py-1 px-4 bg-purple-500 text-white rounded-lg">create new playlist</button>
        </div>
      </div>
    )
  } else {
  return (
    <div className="w-full h-full">
      <h1 className="m-2">Playlist : {props.tracks.length}</h1>
      <div className="overflow-y-auto h-2/3">
        <div className="flex flex-wrap justify-center">
          {props.tracks < 1 && <div>Fill this playlist with song!</div>}
          {props.tracks.map((track, index) => {
            return (
              <div key={track.track.uri} className="m-2 h-64 w-52 relative group hover:scale-105 transform transition">
                {/* hover effect */}
                <div className="absolute h-full w-full left-0 top-0 transition bg-black rounded-xl opacity-0 group-hover:opacity-30 z-10"></div>
                <div className="absolute h-full w-full left-0 top-0 bg-blue-500 rounded-xl opacity-70"></div>

                <div className="p-2 w-full h-full absolute inset-0 z-20">
                  <div className="rounded-full w-48 h-48 relative mb-1">
                    {/* play button */}
                    <div onClick={()=> props.setSong(index)} className="w-14 h-14 absolute bottom-0 left-4 rounded-full bg-green-500 text-4xl flex justify-center items-center cursor-pointer opacity-95 shadow-md">
                      <i className="bi bi-play-fill text-white rounded-full ml-0.5 mb-0.5"></i>
                    </div>
                    {/* delete button */}
                    <div onClick={()=> props.deleteTrack(track.track.uri)} className="w-14 h-14 absolute bottom-0 right-4 rounded-full bg-red-500 text-4xl flex justify-center items-center cursor-pointer opacity-95 shadow-md">
                      <i className="bi bi-trash text-white rounded-full"></i>
                    </div>
                    {/* image */}
                    <img className="h-full w-full overflow-hidden rounded-full" src={track.track.album.images[1].url} alt={track.track.name} />
                  </div>
                  <p className="overflow-hidden">{track.track.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
  }
}

export default PlaylistComponent
