import React from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';

function Player(props) {
  const change = (param)=> {
    props.setPlay(param)
  }
  return (
    <div className="bg-gray-400 mb-16 w-full"> 
        <SpotifyWebPlayer
          token={props.accessToken}
          showSaveIcon
          autoPlay={true}
          play={props.play}
          callback={(state => {
            if(!state.isPlaying) change(false);
            if(props.play) state.progressMs = props.playedSong
          })}
          offset={props.playedSong}
          uris={props.tracks ? props.tracks.map(track => track.track.uri) : []}
          styles={{
            activeColor: '#fff',
            bgColor: '#a855f7',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#A78BFA',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}
        />
      </div>
  )
}

export default Player
