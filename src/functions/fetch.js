const axios = require('axios')

module.exports = {
  fetchTopArtists: async token => {
    const options = {
      url: 'https://api.spotify.com/v1/me/top/artists',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
    const { data: topArtists } = await axios(options)
    return topArtists
  },
}
