import React from 'react'

function RedAlertComponent(props) {
  return (
    <div className="absolute left-0 top-0 bg-red-400 z-50 opacity-70">
      <span className="block py-8 px-10">{props.message}</span>
    </div>
  )
}

export default RedAlertComponent
