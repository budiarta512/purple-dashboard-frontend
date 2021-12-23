import React from 'react'

function SpotifyLogin(props) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="mb-2">
        <a className="py-2 px-6 bg-green-500 text-white" href={props.full_uri}>Login with Spotify</a>
      </div>
      <div>
        <p className="text-center text-gray-800">this feature is integrated with spotify api</p>
        <p className="text-center text-gray-800">Note: You must have spotify premium account to use this feature</p>
      </div>
    </div>
  )
}

export default SpotifyLogin
