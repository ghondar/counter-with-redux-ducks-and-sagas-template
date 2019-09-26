import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import counterDucks from 'reducers/counter'

const { addCount, removeCount, addCountFromServer } = counterDucks.creators

export default () => {
  const dispatch = useDispatch()
  const count = useSelector(({ counter: { count } }) => count)

  return (
    <div data-testid='counter'>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(addCount())}>Add</button>
      <button onClick={() => dispatch(removeCount())}>remove</button>
      <button onClick={() => dispatch(addCountFromServer())}>Add 5 From Server</button>
    </div>
  )
}
