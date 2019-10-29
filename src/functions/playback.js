module.exports = {
  togglePlay: player => {
    player.togglePlay().then(() => {
      console.log('Toggle')
    })
  },
  nextTrack: player => {
    player.nextTrack().then(() => {
      console.log('Next track')
    })
  },
  previousTrack: player => {
    player.previousTrack().then(() => {
      console.log('Next track')
    })
  },
  playUri: ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken, id },
    },
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${access_token}`,
        },
      })
    })
  },
}
