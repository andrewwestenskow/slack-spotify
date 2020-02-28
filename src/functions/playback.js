const axios = require('axios')

export const togglePlayback = player => {
  player.togglePlay().then(() => {})
}

export const nextTrack = player => {
  player.nextTrack().then(() => {})
}

export const previousTrack = player => {
  player.previousTrack().then(() => {})
}

export const seek = (player, ms) => {
  player.seek(ms).then(() => {})
}

export const toggleShuffle = async (access_token, deviceId, state) => {
  const options = {
    url: `https://api.spotify.com/v1/me/player/shuffle?device_id=${deviceId}&state=${state}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  await axios(options)
}

export const toggleRepeat = async (access_token, deviceId, mode) => {
  let repeatMode
  switch (mode) {
    case 0:
      repeatMode = 'off'
      break
    case 1:
      repeatMode = 'context'
      break
    case 2:
      repeatMode = 'track'
      break
    default:
      repeatMode = 'off'
      break
  }

  const options = {
    url: `https://api.spotify.com/v1/me/player/repeat?device_id=${deviceId}&state=${repeatMode}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  await axios(options)
}

export const handleVolume = (player, volume) => {
  player.setVolume(volume / 100).then(() => {})
}

export const handlePlay = ({ access_token, deviceId, type, uri, offset }) => {
  debugger
  if (access_token && deviceId && type && uri) {
    switch (type) {
      case 'tracks':
        if (offset || offset === 0) {
          playTracks(access_token, deviceId, uri, offset)
        } else {
          console.log('Missing media offset')
        }
        break
      case 'album':
        if (offset || offset === 0) {
          playAlbum(access_token, deviceId, uri, offset)
        } else {
          console.log('Missing media offset')
        }
        break
      case 'artist':
        playArtist(access_token, deviceId, uri)
        break
      case 'playlist':
        if (offset || offset === 0) {
          playPlaylist(access_token, deviceId, uri, offset)
        } else {
          console.log('Missing media offset')
        }
        break
      default:
        return
    }
  } else {
    if (!access_token) {
      console.log('Missing Spotify access token')
    }

    if (!deviceId) {
      console.log('No valid Spotify device id provided')
    }

    if (!uri) {
      console.log('Missing Spotify uri')
    }

    if (!type) {
      console.log('Missing valid media type')
    }
  }
}

export const playAlbum = (access_token, deviceId, context_uri, offset) => {
  const body = {
    context_uri: context_uri,
    offset: {
      position: offset,
    },
  }

  const options = {
    url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
    data: body,
  }
  try {
    axios(options)
  } catch (error) {
    console.log(error)
  }
}

export const playTracks = (access_token, deviceId, uris, offset) => {
  let body
  if (offset) {
    body = {
      uris,
      offset: { uri: offset },
    }
  } else {
    body = {
      uris,
    }
  }
  const options = {
    url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
    data: body,
  }

  try {
    axios(options)
  } catch (error) {
    console.log(error)
  }
}

export const playArtist = (access_token, deviceId, context_uri) => {
  const body = {
    context_uri: context_uri,
  }
  const options = {
    url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
    data: body,
  }

  try {
    axios(options)
  } catch (error) {
    console.log(error)
  }
}

export const playPlaylist = (access_token, deviceId, context_uri, offset) => {
  const body = {
    context_uri: context_uri,
    offset: {
      position: offset,
    },
  }
  const options = {
    url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
    data: body,
  }

  try {
    axios(options)
  } catch (error) {
    console.log(error)
  }
}
