const axios = require('axios')

module.exports = {
  play: async access_token => {
    const options = {
      url: `https://api.spotify.com/v1/me/player/play`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    await axios(options)
  },

  pause: async access_token => {
    const options = {
      url: `https://api.spotify.com/v1/me/player/pause`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    await axios(options)
  },
  nextTrack: (nowPlaying, access_token) => {
    console.log(nowPlaying, access_token)
  },
  previousTrack: (nowPlaying, access_token) => {},

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
