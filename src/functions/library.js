const axios = require('axios')

export const addToLibrary = async ({ id, type, access_token }) => {
  const albumOptions = {
    url: `https://api.spotify.com/v1/me/albums?ids=${id}`,
    method: 'PUT',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  switch (type) {
    case 'album':
      await axios(albumOptions)
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

  switch (type) {
    case 'album':
      await axios(albumOptions)
      break
    default:
      return
  }
}
