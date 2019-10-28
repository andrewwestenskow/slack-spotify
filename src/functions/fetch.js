const axios = require('axios')

module.exports = {
  search: async (searchTerm, access_token) => {
    const term = encodeURIComponent(searchTerm.trim())
    const options = {
      url: `https://api.spotify.com/v1/search?q=${term}&type=track,artist,album&market=us&limit=10`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    const { data: searchResults } = await axios(options)
    return searchResults
  },
  fetchTopArtists: async access_token => {
    if (access_token) {
      const options = {
        url: 'https://api.spotify.com/v1/me/top/artists',
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}` },
      }
      const {
        data: { items: topArtists },
      } = await axios(options)
      return topArtists
    }
  },
}
