import { compose, applyMiddleware, createStore, combineReducers } from 'redux'
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import track from './middlewares/track'

import { user } from 'domain/redux/reducers/user'
import { network } from 'domain/redux/reducers/network'
import { tab } from 'domain/redux/reducers/tab'

export const init = async() => {

  const reducer = combineReducers({
    user,
    network,
    tab
  })
  const store = compose(
    autoRehydrate(),
    applyMiddleware(thunk, track)
  )(createStore)(reducer)
  return new Promise((resolve, reject) => {
    const blacklist = ['network', 'tab']
    const storage = AsyncStorage
    persistStore(store, { blacklist, storage }, () => {
      resolve(store)
    })
  })
}
