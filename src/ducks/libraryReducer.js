const initialState = {
  albums: [],
  artists: [],
}

const SET_ALBUMS = 'SET_ALBUMS'
const SET_ARTISTS = 'SET_ARTISTS'

export const setAlbums = albums => {
  return {
    type: SET_ALBUMS,
    payload: albums,
  }
}

export const setArtists = artists => {
  return {
    type: SET_ARTISTS,
    payload: artists,
  }
}

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload,
      }
    default:
      return state
  }
}

export default libraryReducer
