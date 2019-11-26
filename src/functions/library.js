const axios = require('axios')

export const addToLibrary = async ({ id, type, access_token }) => {
  const albumOptions = {
    url: `https://api.spotify.com/v1/me/albums?ids=${id}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const playlistOptions = {
    url: `https://api.spotify.com/v1/playlists/${id}/followers`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}, Content-Type: 'application/json'`,
    },
  }

  const artistOptions = {
    url: `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  switch (type) {
    case 'album':
      await axios(albumOptions)
      break
    case 'playlist':
      await axios(playlistOptions)
      break
    case 'artist':
      await axios(artistOptions)
      break
    default:
      return
  }
}

export const removeFromLibrary = async ({ id, type, access_token }) => {
  const albumOptions = {
    url: `https://api.spotify.com/v1/me/albums?ids=${id}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const playlistOptions = {
    url: `https://api.spotify.com/v1/playlists/${id}/followers`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const artistOptions = {
    url: `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  switch (type) {
    case 'album':
      await axios(albumOptions)
      break
    case 'playlist':
      await axios(playlistOptions)
      break
    case 'artist':
      await axios(artistOptions)
      break
    default:
      return
  }
}
