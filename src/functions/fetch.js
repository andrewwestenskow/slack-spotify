import globalCatch from './globalCatch'
const axios = require('axios')
const { trackTime, albumTime } = require('./conversion')

export const search = async (searchTerm, access_token, refresh_token) => {
  const term = encodeURIComponent(searchTerm.trim())
  const options = {
    url: `https://api.spotify.com/v1/search?q=${term}&type=track,artist,album&market=us&limit=10`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const { data: searchResults } = await axios(options)
    return searchResults
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      options
    )
    const { data: searchResults } = await axios(updatedOptions)
    return searchResults
  }
}

export const fetchDashboardInfo = async (access_token, refresh_token) => {
  let topArtists
  let recent
  let inLibrary
  let featured
  let myPlaylists

  //? FETCH TOP ARTISTS WITH GLOBAL CATCH

  const topOptions = {
    url: 'https://api.spotify.com/v1/me/top/artists',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    //data.items
    const {
      data: { items: topArtistItems },
    } = await axios(topOptions)
    topArtists = topArtistItems
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      topOptions
    )
    const {
      data: { items: topArtistItems },
    } = await axios(updatedOptions)
    topArtists = topArtistItems
  }

  //? FETCH RECENT ALBUMS WITH GLOBAL CATCH

  const recentOptions = {
    url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const {
      data: { items: recentItems },
    } = await axios(recentOptions)
    recent = recentItems
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      recentOptions
    )
    const {
      data: { items: recentItems },
    } = await axios(updatedOptions)
    recent = recentItems
  }

  //? DETERMINE IF RECENTLY PLAYED ARE CURRENTLY IN LIBRARY WITH GLOBAL CATCH

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

  try {
    const { data: checkOptionsItems } = await axios(checkOptions)
    inLibrary = checkOptionsItems
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      checkOptions
    )
    const { data: checkOptionsItems } = await axios(updatedOptions)
    inLibrary = checkOptionsItems
  }

  //APPLY IN LIBRARY PROPERTY TO RECENT OBJECTS
  const libraryCheckRecent = newRecent.map((element, index) => {
    element.inLibrary = inLibrary[index]
    return element
  })

  //? FETCH FEATURED PLAYLISTS WITH GLOBAL CATCH

  const featuredOptions = {
    url: 'https://api.spotify.com/v1/browse/featured-playlists',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const {
      data: {
        playlists: { items: featuredItems },
      },
    } = await axios(featuredOptions)
    featured = featuredItems
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      featuredOptions
    )
    const {
      data: {
        playlists: { items: featuredItems },
      },
    } = await axios(updatedOptions)
    featured = featuredItems
  }

  //? FETCH MY PLAYLISTS WITH GLOBAL CATCH

  const playlistOptions = {
    url: 'https://api.spotify.com/v1/me/playlists?limit=50',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const {
      data: { items: playlistItems },
    } = await axios(playlistOptions)
    myPlaylists = playlistItems
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      playlistOptions
    )
    const {
      data: { items: playlistItems },
    } = await axios(updatedOptions)
    myPlaylists = playlistItems
  }

  return { topArtists, recent: libraryCheckRecent, featured, myPlaylists }
}

export const getNowPlaying = async (access_token, refresh_token) => {
  const options = {
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const { data: nowPlaying } = await axios(options)
    return nowPlaying
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      options
    )
    const { data: nowPlaying } = await axios(updatedOptions)
    return nowPlaying
  }
}

export const getPlayerInfo = async (access_token, refresh_token) => {
  const options = {
    url: 'https://api.spotify.com/v1/me/player',
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const { data: playerInfo } = await axios(options)
    return playerInfo
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      options
    )
    const { data: playerInfo } = await axios(updatedOptions)
    return playerInfo
  }
}

export const getArtist = async (access_token, refresh_token, artistId) => {
  let artistInfo
  let albums
  let inLibrary
  let topTracks
  let relatedArtists
  let follows

  //? GET GENERAL ARTIST INFO WITH GLOBAL CATCH
  const options = {
    url: `https://api.spotify.com/v1/artists/${artistId}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const { data: artistInfoData } = await axios(options)
    artistInfo = artistInfoData
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      options
    )
    const { data: artistInfoData } = await axios(updatedOptions)
    artistInfo = artistInfoData
  }

  //?GET ARTISTS ALBUMS WITH GLOBAL CATCH
  const albumsOptions = {
    url: `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&country=us&limit=50`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const { data: albumsData } = await axios(albumsOptions)
    albums = albumsData
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      albumsOptions
    )
    const { data: albumsData } = await axios(updatedOptions)
    albums = albumsData
  }

  //? CHECKS IF ALBUMS ARE IN USER LIBRARY
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

  try {
    const { data: inLibraryData } = await axios(checkOptions)
    inLibrary = inLibraryData
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      checkOptions
    )
    const { data: inLibraryData } = await axios(updatedOptions)
    inLibrary = inLibraryData
  }

  const artistAlbumLibraryCheck = albums.items.map((element, index) => {
    element.inLibrary = inLibrary[index]
    return element
  })

  let lastArtistAlbums = []

  //? ACCOUNTS FOR ARTISTS THAT HAVE A LOT OF ALBUMS
  if (albums.next) {
    let secondAlbums
    let secondLibraryCheck

    const secondOptions = {
      url: albums.next,
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }

    try {
      const { data: secondAlbumsData } = await axios(secondOptions)
      secondAlbums = secondAlbumsData
    } catch {
      const { updatedOptions } = await globalCatch(
        access_token,
        refresh_token,
        secondOptions
      )
      const { data: secondAlbumsData } = await axios(updatedOptions)
      secondAlbums = secondAlbumsData
    }

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

    try {
      const { data: secondLibraryCheckData } = await axios(secondCheckOptions)
      secondLibraryCheck = secondLibraryCheckData
    } catch {
      const { updatedOptions } = await globalCatch(
        access_token,
        refresh_token,
        secondCheckOptions
      )
      const { data: secondLibraryCheckData } = await axios(updatedOptions)
      secondLibraryCheck = secondLibraryCheckData
    }

    const secondFormattedAlbums = secondAlbums.items.map((element, index) => {
      element.inLibrary = secondLibraryCheck[index]
      return element
    })

    lastArtistAlbums = [...artistAlbumLibraryCheck, ...secondFormattedAlbums]
  } else {
    lastArtistAlbums = [...artistAlbumLibraryCheck]
  }

  //?GET ARTISTS TOP SONGS WITH GLOBAL CATCH
  const topSongOptions = {
    url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=us`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const { data: topTracksData } = await axios(topSongOptions)
    topTracks = topTracksData
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      topSongOptions
    )
    const { data: topTracksData } = await axios(updatedOptions)
    topTracks = topTracksData
  }

  //?GET RELATED ARTISTS WITH GLOBAL CATCH
  const relatedOptions = {
    url: `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const { data: relatedArtistsData } = await axios(relatedOptions)
    relatedArtists = relatedArtistsData
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      relatedOptions
    )
    const { data: relatedArtistsData } = await axios(updatedOptions)
    relatedArtists = relatedArtistsData
  }

  //? CHECK IF USER FOLLOWS ARTIST

  const artistFollowOptions = {
    url: `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistInfo.id}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${access_token}` },
  }

  try {
    const {
      data: [followsData],
    } = await axios(artistFollowOptions)
    follows = followsData
  } catch {
    const { updatedOptions } = await globalCatch(
      access_token,
      refresh_token,
      artistFollowOptions
    )
    const {
      data: [followsData],
    } = await axios(updatedOptions)
    follows = followsData
  }

  artistInfo.inLibrary = follows

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
