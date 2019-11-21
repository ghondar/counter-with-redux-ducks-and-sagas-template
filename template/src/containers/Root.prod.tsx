import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AnyAction, Store } from 'redux'

interface RootProps {
  store: Store<any, AnyAction>
}

export default class Root extends Component<RootProps> {
  render() {
    const { store, children } = this.props

    return <Provider store={store}>{children}</Provider>
  }
}
