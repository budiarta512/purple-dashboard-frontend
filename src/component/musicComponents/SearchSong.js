import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './SearchSong.css';

function SearchSong(props) {
  return (
    <div className="w-full">
      <form className="w-full relative group">
        <input className="relative w-full pl-8 p-2 border border-gray-400 outline-none rounded-md focus:ring-2 ring-purple-400" type="input" value={props.search} onChange={(e)=> props.setSearch(e.target.value)} 
        placeholder="Search Artis/Album"
        />
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"><i className="bi bi-search"></i></div>
        <span onClick={()=> props.setSearch('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg font-semibold text-purple-600">x</span>
      </form>
      <div className={`z-50 absolute buttom-0 border border-gray-600 overflow-y-auto h-2/3 bg-white w-full ${!props.search ? 'hidden' : 'block'}`}>
        <p>result : </p>
        <ul>
          {props.searchResult.map(item => {
            return(
              <li key={item.uri} className="flex items-center justify-between hover:bg-purple-400">
                <div className="flex items-center">
                  <img className="h-12 w-12 m-1 mr-1" src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                </div>
                <div>
                  {
                    props.tracks.map(track => {
                      if(track.track.uri === item.uri) return(
                        <div key={track.track.uri} className="mr-2">added</div>
                      )
                    })
                  }
                  <button onClick={()=> props.addTrack(item.uri)} type="button" className="group-hover:bg-purple-600 text-white rounded-lg py-1 px-4 mr-2 added-song-button">Add to Playlist</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SearchSong
