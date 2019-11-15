import React from 'react'
import PlayWidget from '../PlayWidget/PlayWidget'
import Lottie from 'react-lottie'
import nowPlayingData from '../../assets/lotties/lf30_editor_wx9nP7.json'
import { connect } from 'react-redux'

const AlbumTrack = props => {
  const { info } = props
  console.log(info)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: nowPlayingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="Album-Track">
      <div className="album-track-info-left">
        <div className="album-track-track-number">
          <div className="album-track-number-number">
            {props.nowPlaying === info.name ? (
              <Lottie options={defaultOptions} height={25} width={25} />
            ) : (
              info.track_number
            )}
          </div>
          <PlayWidget
            access_token={props.access_token}
            deviceId={props.deviceId}
            uri={props.context}
            offset={info.track_number - 1}
            type="album"
            style={{ background: 'none', transition: 'none' }}
          />
        </div>
        <p className="album-track-title">{info.name}</p>
      </div>
      <p className="album-track-track-length">{info.length}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    nowPlaying: state.nowPlaying.current.name,
  }
}
export default connect(mapStateToProps)(AlbumTrack)
