const axios = require('axios')
const { trackTime, albumTime } = require('./conversion')

export const search = async (searchTerm, access_token) => {
  const term = encodeURIComponent(searchTerm.trim())
  const options = {
    url: `https://api.spotify.com/v1/search?q=${term}&type=track,artist,album&market=us&limit=10`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }
  const { data: searchResults } = await axios(options)
  return searchResults
}

export const fetchDashboardInfo = async access_token => {
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

  const playlistOptions = {
    url: 'https://api.spotify.com/v1/me/playlists?limit=50',
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
      el => el.track.album.name === element.track.album.name
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
      ','
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

  const {
    data: { items: myPlaylists },
  } = await axios(playlistOptions)
  return { topArtists, recent: libraryCheckRecent, featured, myPlaylists }
}

export const getNowPlaying = async access_token => {
  const options = {
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const { data: nowPlaying } = await axios(options)
  return nowPlaying
}

export const getPlayerInfo = async access_token => {
  const options = {
    url: 'https://api.spotify.com/v1/me/player',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const { data: playerInfo } = await axios(options)
  return playerInfo
}

export const getArtist = async (access_token, id) => {
  const options = {
    url: `https://api.spotify.com/v1/artists/${id}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const albumsOptions = {
    url: `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&country=us&limit=50`,
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
  const idsToCheck = albums.items.map(element => {
    return element.id
  })

  const checkOptions = {
    url: `https://api.spotify.com/v1/me/albums/contains?ids=${idsToCheck.join(
      ','
    )}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }
  const { data: inLibrary } = await axios(checkOptions)
  const artistAlbumLibraryCheck = albums.items.map((element, index) => {
    element.inLibrary = inLibrary[index]
    return element
  })

  let lastArtistAlbums = []

  if (albums.next) {
    const secondOptions = {
      url: albums.next,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const { data: secondAlbums } = await axios(secondOptions)
    const secondIds = secondAlbums.items.map(element => {
      return element.id
    })
    const secondCheckOptions = {
      url: `https://api.spotify.com/v1/me/albums/contains?ids=${secondIds.join(
        ','
      )}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const { data: secondLibraryCheck } = await axios(secondCheckOptions)

    const secondFormattedAlbums = secondAlbums.items.map((element, index) => {
      element.inLibrary = secondLibraryCheck[index]
      return element
    })

    lastArtistAlbums = [...artistAlbumLibraryCheck, ...secondFormattedAlbums]
  } else {
    lastArtistAlbums = [...artistAlbumLibraryCheck]
  }

  const artist = {
    info: artistInfo,
    albums: lastArtistAlbums,
    topTracks: topTracks.tracks,
    relatedArtists: relatedArtists.artists,
  }
  return artist
}

export const getAlbum = async (access_token, id) => {
  const options = {
    url: `https://api.spotify.com/v1/albums/${id}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const { data: album } = await axios(options)

  const totalTime = album.tracks.items.reduce((acc, element) => {
    return (acc += element.duration_ms)
  }, 0)

  album.tracks.formatted = []

  album.tracks.items.forEach(element => {
    element.length = trackTime(element.duration_ms)
    if (album.tracks.formatted[element.disc_number - 1]) {
      album.tracks.formatted[element.disc_number - 1].push(element)
    } else {
      album.tracks.formatted[element.disc_number - 1] = [element]
    }
  })

  album.length = albumTime(totalTime)

  const checkOptions = {
    url: `https://api.spotify.com/v1/me/albums/contains?ids=${id}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }
  const { data: inLibrary } = await axios(checkOptions)

  album.inLibrary = inLibrary[0]

  return album
}

export const getPlaylist = async (access_token, id, userId) => {
  let nextUrl = null
  const playlistOptions = {
    url: `https://api.spotify.com/v1/playlists/${id}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const { data: playlist } = await axios(playlistOptions)

  nextUrl = playlist.tracks.next

  while (nextUrl !== null) {
    const nextTracksOptions = {
      url: nextUrl,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const { data: moreTracks } = await axios(nextTracksOptions)

    playlist.tracks.items = [...playlist.tracks.items, ...moreTracks.items]

    nextUrl = moreTracks.next
  }

  const notNull = playlist.tracks.items.filter(element => {
    if (element.track) {
      return true
    } else {
      return false
    }
  })

  playlist.tracks.items = notNull

  const playlistLength = playlist.tracks.items.reduce((acc, element) => {
    return (acc += element.track.duration_ms)
  }, 0)
  playlist.length = albumTime(playlistLength)

  if (userId) {
    const followOptions = {
      url: `https://api.spotify.com/v1/playlists/${playlist.id}/followers/contains?ids=${userId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const {
      data: [follows],
    } = await axios(followOptions)

    playlist.inLibrary = follows
    return playlist
  } else {
    return playlist
  }
}

export const getLibraryAlbums = async access_token => {
  let nextUrl = null

  const options = {
    url: 'https://api.spotify.com/v1/me/albums?limit=50',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const { data: albums } = await axios(options)

  nextUrl = albums.next

  while (nextUrl !== null) {
    const moreOptions = {
      url: nextUrl,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    const { data: moreAlbums } = await axios(moreOptions)
    albums.items = [...albums.items, ...moreAlbums.items]
    nextUrl = moreAlbums.next
  }

  albums.items.forEach(element => {
    element.album.inLibrary = true
  })

  albums.items.sort((a, b) => {
    if (a.album.artists[0].name > b.album.artists[0].name) {
      return 1
    } else {
      return -1
    }
  })

  return albums
}

export const getFollowedArtists = async access_token => {
  const options = {
    url: 'https://api.spotify.com/v1/me/following?type=artist&limit=50',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const {
    data: {
      artists: { items: followedArtists },
    },
  } = await axios(options)

  const sortedFollowedArtists = followedArtists.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    } else {
      return -1
    }
  })

  return sortedFollowedArtists
}
