const axios = require('axios')

module.exports = {
  togglePlay: player => {
    player.togglePlay().then(() => {
      console.log('Toggle')
    })
  },
  nextTrack: player => {
    player.nextTrack().then(() => {
      console.log('Next track')
    })
  },
  previousTrack: player => {
    player.previousTrack().then(() => {
      console.log('Next track')
    })
  },

  handlePlay: ({ access_token, deviceId, type, uri, offset }) => {
    switch (type) {
      case 'tracks':
        module.exports.playTracks(access_token, deviceId, uri, offset)
        break
      case 'album':
        module.exports.playAlbum(access_token, deviceId, uri, offset)
        break
      case 'artist':
        module.exports.playArtist(access_token, deviceId, uri)
        break
      case 'playlist':
        module.exports.playPlaylist(access_token, deviceId, uri, offset)
        break
      default:
        return
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

    console.log(options)

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
