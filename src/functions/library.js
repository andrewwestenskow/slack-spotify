const axios = require('axios')

module.exports = {
  addToLibrary: ({ id, type, access_token }) => {
    const albumOptions = {
      url: `https://api.spotify.com/v1/me/albums?ids=${id}`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    switch (type) {
      case 'album':
        axios(albumOptions)
        break
      default:
        return
    }
  },
  removeFromLibrary: ({ id, type, access_token }) => {
    const albumOptions = {
      url: `https://api.spotify.com/v1/me/albums?ids=${id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    switch (type) {
      case 'album':
        axios(albumOptions)
        break
      default:
        return
    }
  },
}
