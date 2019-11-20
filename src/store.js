import { createStore, combineReducers } from 'redux'
import authReducer from './ducks/authReducer'
import spotifyReducer from './ducks/spotifyReducer'
import nowPlayingReducer from './ducks/nowPlaingReducer'
import userReducer from './ducks/userReducer'
import libraryReducer from './ducks/libraryReducer'
import { devToolsEnhancer } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  nowPlaying: nowPlayingReducer,
  user: userReducer,
  library: libraryReducer,
})

const store = createStore(rootReducer, devToolsEnhancer())

export default store
