import { useEffect, useRef, EffectCallback } from 'react'

export const useComponentDidMount = (func: EffectCallback) => useEffect(func, [])

export const useComponentWillMount = (func: EffectCallback) => {
  const willMount = useRef(true)

  if(willMount.current)
    func()

  useComponentDidMount(() => {
    willMount.current = false
  })
}
