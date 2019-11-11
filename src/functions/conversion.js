module.exports = {
  trackTime: milliseconds => {
    const ms = milliseconds % 1000
    milliseconds = (milliseconds - ms) / 1000
    let secs = milliseconds % 60
    milliseconds = (milliseconds - secs) / 60
    const mins = milliseconds % 60

    if (String(secs).length === 1) {
      secs = `0${secs}`
    }

    return `${mins}:${secs}`
  },
}
