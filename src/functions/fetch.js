const axios = require('axios')
const access_token = localStorage.getItem('access_token')
module.exports = {
  fetchTopArtists: async () => {
    const options = {
      url: 'https://api.spotify.com/v1/me/top/artists',
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    const { data: topArtists } = await axios(options)
    return topArtists
  },
}
