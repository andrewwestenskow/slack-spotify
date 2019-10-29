const initialState = {
  player: {},
  deviceId: '',
}

const SET_PLAYER = 'SET_PLAYER'

export const setPlayer = payload => {
  return {
    type: SET_PLAYER,
    payload: {
      player: payload.player,
      deviceId: payload.deviceId,
    },
  }
}

const spotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        player: action.payload.player,
        deviceId: action.payload.deviceId,
      }
    default:
      return state
  }
}

export default spotifyReducer
