import React, { useEffect, useState } from 'react'
import { togglePlay, nextTrack, previousTrack } from '../../functions/playback'
import { connect } from 'react-redux'
import analyze from 'rgbaster'
import spotify from '../../assets/spotify.png'

const Player = props => {
  const [gradient, setGradient] = useState('#000000')

  const style = {
    background: `rgb(0,0,0)`,
    backgroundImage: `linear-gradient(312deg, rgba(0,0,0,1) 80%, ${gradient} 99%)`,
  }

  useEffect(() => {
    if (props.current.album) {
      analyze(props.current.album.images[0].url, { scale: 0.5 }).then(
        result => {
          setGradient(result[0].color)
        },
      )
    }
  }, [gradient, props])
  return (
    <div className="Player" style={{ ...style }}>
      {props.current.album ? (
        <img
          src={props.current.album.images[0].url}
          alt=""
          className="album-art"
        />
      ) : (
        <img src={spotify} alt="" className="album-art" />
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
