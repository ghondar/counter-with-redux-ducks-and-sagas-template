import { combineReducers, Reducer } from 'redux'
import { all } from 'redux-saga/effects'
import { connectRouter, RouterState, LocationChangeAction } from 'connected-react-router'

import counter from './counter'

export interface State {
  router: Reducer<RouterState, LocationChangeAction>,
  [propName: string]: any
}

export default (history: any) => combineReducers({
  router         : connectRouter(history),
  [counter.store]: counter.reducer
})

export function* rootSaga() {
  yield all([ ...counter.takes ])
}
