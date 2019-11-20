import React from 'react'
import Lottie from 'react-lottie'
import spotifyData from '../../assets/lotties/lf30_editor_mnn0VB.json'

export const SpotifyLoading = props => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spotifyData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="Spotify-Loading">
      <Lottie height={500} width={500} options={defaultOptions} />
    </div>
  )
}

export const SpotifyLoadingTransparent = props => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spotifyData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="Spotify-Loading-Transparent">
      <Lottie height={500} width={500} options={defaultOptions} />
    </div>
  )
}
