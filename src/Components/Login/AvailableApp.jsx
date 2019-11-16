import React from 'react'

const AvailableApp = props => {
  return (
    <div className="Available-App">
      <img className="available-app-image" src={props.image} alt={props.name} />
      <p className="available-app-name">{props.name}</p>
    </div>
  )
}
export default AvailableApp
