import React from 'react'

function Loader(props) {

  return (
    <div className={`flex w-full h-full justify-center items-center ${props.position}`}>
      <div className="relative w-auto h-auto flex">
        <div style={{'animation-duration': '0.5s'  }} className="w-6 h-6 bg-blue-500 rounded-full animate-bounce m-1"></div>
        <div style={{ 'animation-delay': '0.1s', 'animation-duration': '0.5s'  }} className="w-6 h-6 bg-blue-500 rounded-full animate-bounce m-1"></div>
        <div style={{ 'animation-delay': '0.2s', 'animation-duration': '0.5s'  }} className="w-6 h-6 bg-blue-500 rounded-full animate-bounce m-1"></div>
      </div>
    </div>
  )
}

export default Loader
