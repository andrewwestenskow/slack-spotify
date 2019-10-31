import React from 'react'
import { togglePlay, nextTrack, previousTrack } from '../../functions/playback'
import { connect } from 'react-redux'

const Player = props => {
  console.log(props)
  return (
    <div className="Player">
      {props.current.album && (
        <img
          src={props.current.album.images[0].url}
          alt=""
          className="album-art"
        />
      )}
      <div className="control-button-hold">
        <button onClick={() => previousTrack(props.player)}>Previous</button>
        <button onClick={() => togglePlay(props.player)}>Play</button>
        <button onClick={() => nextTrack(props.player)}>Next</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return state.nowPlaying
}

export default connect(mapStateToProps)(Player)
