import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { App } from './app'
import { init } from 'domain/redux/init'
import 'domain/def/global.func.def'

export class Entry extends Component {
  constructor() {
    super()
    this.state = {
      store: null
    }
  }
  componentDidMount() {
    init().then(__store => {
      global.store = __store
      setTimeout(() => {
        this.setState({ store: __store })
      })
    }).catch((e) => {
      console.log(e)
    })
  }
  render() {
    const { store } = this.state
    if (!store) {
      return null
    }
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
