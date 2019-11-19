const axios = require('axios')

module.exports = {
  togglePlayback: player => {
    console.log(player)
    player.togglePlay().then(() => {
      console.log('Toggled')
    })
  },
  nextTrack: player => {
    player.nextTrack().then(() => {
      console.log('Next track')
    })
  },
  previousTrack: player => {
    player.previousTrack().then(() => {
      console.log('Previous track')
    })
  },

  seek: (player, ms) => {
    player.seek(ms).then(() => {
      console.log(`Seek to ${ms}`)
    })
  },

  toggleShuffle: async (access_token, deviceId, state) => {
    const options = {
      url: `https://api.spotify.com/v1/me/player/shuffle?device_id=${deviceId}&state=${state}`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    await axios(options)
  },

  toggleRepeat: async (access_token, deviceId, mode) => {
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
  },

  handlePlay: ({ access_token, deviceId, type, uri, offset }) => {
    console.log(offset)
    if (access_token && deviceId && type && uri) {
      switch (type) {
        case 'tracks':
          if (offset || offset === 0) {
            module.exports.playTracks(access_token, deviceId, uri, offset)
          } else {
            console.log('Missing media offset')
          }
          break
        case 'album':
          if (offset || offset === 0) {
            module.exports.playAlbum(access_token, deviceId, uri, offset)
          } else {
            console.log('Missing media offset')
          }
          break
        case 'artist':
          module.exports.playArtist(access_token, deviceId, uri)
          break
        case 'playlist':
          if (offset || offset === 0) {
            module.exports.playPlaylist(access_token, deviceId, uri, offset)
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
  },

  playAlbum: (access_token, deviceId, context_uri, offset) => {
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
  },
  playTracks: (access_token, deviceId, uris, offset) => {
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
  },
  playArtist: (access_token, deviceId, context_uri) => {
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
  },
  playPlaylist: (access_token, deviceId, context_uri, offset) => {
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
  },
}
