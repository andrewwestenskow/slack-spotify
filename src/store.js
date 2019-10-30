import { createStore, combineReducers } from 'redux'
import authReducer from './ducks/authReducer'
import spotifyReducer from './ducks/spotifyReducer'
import nowPlayingReducer from './ducks/nowPlaingReducer'
import { devToolsEnhancer } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  nowPlaying: nowPlayingReducer,
})

const store = createStore(rootReducer, devToolsEnhancer())

export default store
