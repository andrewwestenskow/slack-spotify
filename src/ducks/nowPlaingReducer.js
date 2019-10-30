const initialState = {
  current: {},
  next: [],
  previous: [],
}

const SET_NOW_PLAYING = 'SET_NOW_PLAYING'

export const setNowPlaying = payload => {
  return {
    type: SET_NOW_PLAYING,
    payload: {
      current: payload.current_track,
      next: payload.next_tracks,
      previous: payload.previous_tracks,
    },
  }
}

const nowPlayingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOW_PLAYING:
      return {
        ...state,
        current: action.payload.current,
        next: action.payload.next,
        previous: action.payload.previous,
      }
    default:
      return state
  }
}

export default nowPlayingReducer
