import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import produce from 'immer'
import { select, call, put, takeEvery } from 'redux-saga/effects'

import { Get } from 'lib/Request'
import base from './base'

export default base({
  namespace   : 'crassa',
  store       : 'counter',
  initialState: {
    count: 0
  }
}).extend({
  types  : [ 'ADD_COUNT', 'REMOVE_COUNT' ],
  reducer: (state, action, { types }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.ADD_COUNT:
          draft.count++

          return
        case types.REMOVE_COUNT:
          draft.count--

          return
        default:
          return
      }
    }),
  selectors: ({ store }) => ({
    getCount: state => state[store].count
  }),
  creators: ({ types }) => ({
    addCount          : () => ({ type: types.ADD_COUNT }),
    removeCount       : () => ({ type: types.REMOVE_COUNT }),
    addCountFromServer: () => ({ type: types.FETCH, [WAIT_FOR_ACTION]: types.FETCH_FULFILLED })
  }),
  sagas: ({ types, selectors }) => ({
    addCountFromServer: function* () {
      try {
        yield put({ type: types.FETCH_PENDING })
    
        const payload = yield call(Get, 'counter')
        const count = yield select(selectors.getCount)
    
        yield put({
          type   : types.FETCH_FULFILLED,
          payload: {
            count: payload.count + count
          }
        })
      } catch (e) {
        const { type, message, response: { data: { message: messageResponse } = {} } = {} } = e
        switch (type) {
          case 'cancel':
            yield put({ type: types.FETCH_CANCEL })
            break
          default:
            yield put({
              type : types.FETCH_FAILURE,
              error: messageResponse || message
            })
            break
        }
      }
    }
  }),
  takes: ({ types, sagas }) => ([
    takeEvery(types.FETCH, sagas.addCountFromServer)
  ])
})
