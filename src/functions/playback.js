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
}
