import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from './ducks/authReducer'
import spotifyReducer from './ducks/spotifyReducer'
import nowPlayingReducer from './ducks/nowPlaingReducer'
import userReducer from './ducks/userReducer'
import libraryReducer from './ducks/libraryReducer'
import socketReducer from './ducks/socketReducer'
import contextMenuReducer from './ducks/contextMenuReducer'
import { devToolsEnhancer } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
  nowPlaying: nowPlayingReducer,
  user: userReducer,
  library: libraryReducer,
  socket: socketReducer,
  contextMenu: contextMenuReducer,
})

const store = createStore(
  rootReducer,
  compose(applyMiddleware(promiseMiddleware), devToolsEnhancer())
)

export default store
