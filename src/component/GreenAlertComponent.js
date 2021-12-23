import React from 'react'

function GreenAlertComponent(props) {
  return (
    <div className="absolute right-0 top-0 bg-green-400 z-50 opacity-70">
      <span className="block py-8 px-10">{props.message}</span>
    </div>
  )
}

export default GreenAlertComponent
