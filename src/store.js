import { createStore, combineReducers } from 'redux'
import authReducer from './ducks/authReducer'
import { devToolsEnhancer } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  auth: authReducer,
})

const store = createStore(rootReducer, devToolsEnhancer())

export default store
