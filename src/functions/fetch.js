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
  fetchDashboardInfo: async access_token => {
    const topOptions = {
      url: 'https://api.spotify.com/v1/me/top/artists',
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    const recentOptions = {
      url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    const featuredOptions = {
      url: 'https://api.spotify.com/v1/browse/featured-playlists',
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    const {
      data: { items: topArtists },
    } = await axios(topOptions)
    const {
      data: { items: recent },
    } = await axios(recentOptions)
    const newRecent = recent.reduce((acc, element) => {
      const index = acc.findIndex(
        el => el.track.album.name === element.track.album.name,
      )
      if (index === -1) {
        return [...acc, element]
      } else {
        return acc
      }
    }, [])
    const idsToCheck = newRecent.map(element => {
      return element.track.album.id
    })
    const checkOptions = {
      url: `https://api.spotify.com/v1/me/albums/contains?ids=${idsToCheck.join(
        ',',
      )}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }
    const { data: inLibrary } = await axios(checkOptions)
    const libraryCheckRecent = newRecent.map((element, index) => {
      element.inLibrary = inLibrary[index]
      return element
    })
    const {
      data: {
        playlists: { items: featured },
      },
    } = await axios(featuredOptions)
    return { topArtists, recent: libraryCheckRecent, featured }
  },
}
