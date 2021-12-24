import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import Player from '../component/musicComponents/Player';
import SearchSong from '../component/musicComponents/SearchSong';
import PlaylistComponent from '../component/musicComponents/PlaylistComponent';
import useSpotifyAuth from '../helper/useSpotifyAuth';
import SpotifyLogin from '../component/musicComponents/SpotifyLogin';
import SpotifyWebApi from 'spotify-web-api-node';

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [playedSong, setPlayedSong] = useState(0);
  const [userId, setUserId] = useState('');
  const [playlist, setPlayList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);

  // make url for spotify api
  let client_id = process.env.REACT_APP_CLIENT_ID;
  let redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  let scope = 'playlist-modify-private playlist-read-private streaming user-read-email user-read-private user-library-read user-read-playback-state user-modify-playback-state user-library-modify playlist-modify-public';
  let full_uri = 'https://accounts.spotify.com/authorize';
  full_uri += '?response_type=code';
  full_uri += '&client_id=' + encodeURIComponent(client_id);
  full_uri += '&scope=' + encodeURIComponent(scope);
  full_uri += '&redirect_uri=' + encodeURIComponent(redirect_uri);

  // get code from url
  const code = new URLSearchParams(window.location.search).get('code');

  // get access token from spotify hook
  const accessToken = useSpotifyAuth(code);

  // spotify web api
  let spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  // set token
  useEffect(()=> {
    if(!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // search
  useEffect(()=> {
    if(!search) return setSearchResult([]);
    if(!accessToken) return;
    let cancel = false;
    axios.get(' https://api.spotify.com/v1/search/?type=track&q=' + search, {headers: {Authorization: `Bearer ${accessToken}`}})
      .then(res => {
        if(cancel) return;
        setSearchResult(res.data.tracks.items.map(track => {
          return {
            title: track.name,
            artist: track.artists[0].name,
            image: track.album.images[1].url,
            uri: track.uri
          }
        }));
      })
      .catch(err => {
        console.log(err);
      })
      return ()=> cancel = true;
  }, [search, accessToken])

  // get profil
  useEffect(()=> {
    if(!accessToken) return;
    spotifyApi.getMe()
      .then(res => {
        setUserId(res.body.id)
      })
      .catch(err => {
        console.log(err);
      });
  }, [accessToken]);

  // get user current playlist
  useEffect(() => {
    setLoading(true);
    if(!accessToken) return;
    axios.get('https://api.spotify.com/v1/me/playlists', {headers: {Authorization : `Bearer ${accessToken}`}})
      .then(res => {
        console.log(res)
        setPlayList(res.data.items[0]);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userId, refresh]);

  // create playlist
  const createPlaylist = () => {
    if(!accessToken) return;
    if(!userId) return;
    axios.post('https://api.spotify.com/v1/users/'+ userId +'/playlists', {name: 'new playlist', description: 'new playlist description', public: false}, {headers: {Authorization : `Bearer ${accessToken}`}})
      .then(res => {
        console.log(res);
        setRefresh(old => old + 1);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // get track
  useEffect(()=> {
    if(!playlist) return;
    axios.get("https://api.spotify.com/v1/playlists/"+ playlist.id +"/tracks", {headers: {Authorization : `Bearer ${accessToken}`}})
      .then(res => {
        setTracks(res.data.items);
      })
      .catch(err => {
        console.log(err);
      });
  }, [playlist, refresh])

  // add track to playlist
  const addTrack = (uri)=> {
    if(!playlist) return;
    axios.post(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {uris: [uri], position: 0}, {headers: {Authorization : `Bearer ${accessToken}`}})
      .then(res => {
        console.log(res)
        setRefresh(old => old + 1);
      })
      .catch(err => {
        console.log(err);
      })
  }
  // delete track from playlist
  const deleteTrack = (uri, index)=> {
    if(!playlist) return;
    console.log(accessToken)
    axios.delete(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {data: {tracks: [{uri}]}, headers: {Authorization: `Bearer ` + accessToken}})
      .then(res => {
        console.log(res)
        setRefresh(old => old + 1);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const setSong = (number) => {
    setPlay(true)
    setTimeout(()=> {
      setPlayedSong(number)
    }, 100)
  }
  return (
    !code ? 
    <SpotifyLogin full_uri={full_uri} />
    :
    <div className="w-full h-full relative">
      <SearchSong search={search} setSearch={setSearch} searchResult={searchResult} playliast={playlist} setRefresh={setRefresh} accessToken={accessToken} addTrack={addTrack} tracks={tracks} />
      <PlaylistComponent tracks={tracks} setSong={setSong} deleteTrack={deleteTrack} playlist={playlist} createPlaylist={createPlaylist} loading={loading} />
      <div className="absolute bottom-0 left-0 w-full">
        {accessToken && <Player tracks={tracks} accessToken={accessToken} playedSong={playedSong} play={play} setPlay={setPlay} />}
      </div>
    </div>
  )
}

export default withRouter(Music);