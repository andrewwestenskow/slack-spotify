const axios = require('axios')
const access_token = localStorage.getItem('access_token')

module.exports = {
  search: async searchTerm => {
    const term = encodeURIComponent(searchTerm.trim())
    const options = {
      url: `https://api.spotify.com/v1/search?q=${term}&type=track,artist,album&market=us&limit=10`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    const { data: searchResults } = await axios(options)
    return searchResults
  },
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
