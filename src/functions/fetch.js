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
  getNowPlaying: async access_token => {
    const options = {
      url: 'https://api.spotify.com/v1/me/player/currently-playing',
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const { data: nowPlaying } = await axios(options)
    return nowPlaying
  },
  getPlayerInfo: async access_token => {
    const options = {
      url: 'https://api.spotify.com/v1/me/player',
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const { data: playerInfo } = await axios(options)
    console.log(playerInfo)
    return playerInfo
  },

  getArtist: async (access_token, id) => {
    const options = {
      url: `https://api.spotify.com/v1/artists/${id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const albumsOptions = {
      url: `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&market=us&limit=50`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const topSongOptions = {
      url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=us`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const relatedOptions = {
      url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const { data: artistInfo } = await axios(options)
    const { data: albums } = await axios(albumsOptions)
    const { data: topTracks } = await axios(topSongOptions)
    const { data: relatedArtists } = await axios(relatedOptions)
    const artist = {
      info: artistInfo,
      albums: albums.items,
      topTracks: topTracks.tracks,
      relatedArtists: relatedArtists.artists,
    }
    return artist
  },
}
