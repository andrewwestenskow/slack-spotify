module.exports = {
  trackTime: s => {
    let ms = s % 1000
    s = (s - ms) / 1000
    let secs = s % 60
    s = (s - secs) / 60
    let mins = s % 60
    let hrs = (s - mins) / 60

    if (String(secs).length === 1) {
      secs = `0${secs}`
    }

    if (hrs === 0) {
      return mins + ':' + secs
    } else {
      if (String(mins).length === 1) {
        mins = `0${mins}`
      }
      return hrs + ':' + mins + ':' + secs
    }
  },

  albumTime: s => {
    let ms = s % 1000
    s = (s - ms) / 1000
    let secs = s % 60
    s = (s - secs) / 60
    let mins = s % 60
    let hrs = (s - mins) / 60

    if (String(secs).length === 1) {
      secs = `0${secs}`
    }

    if (hrs === 0) {
      return `${mins} minutes`
    } else {
      return `${hrs} hour${hrs === 1 ? '' : 's'}, ${mins} minute${
        mins === 1 ? '' : 's'
      }`
    }
  },
}
