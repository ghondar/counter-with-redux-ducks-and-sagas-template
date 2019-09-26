import { select, call, put } from 'redux-saga/effects'
import { Get } from 'lib/Request'

export const addCountFromServer = ({ types, selectors }) => function* () {
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
