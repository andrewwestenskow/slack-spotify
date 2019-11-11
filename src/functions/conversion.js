module.exports = {
  trackTime: milliseconds => {
    const ms = milliseconds % 1000
    milliseconds = (milliseconds - ms) / 1000
    const secs = milliseconds % 60
    milliseconds = (milliseconds - secs) / 60
    const mins = milliseconds % 60

    return `${mins}:${secs}`
  },
}
