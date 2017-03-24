import React, { Component } from 'react'
import { View } from 'react-native'
import { H } from 'domain/def'

export class TabbarItem extends Component {
  render() {
    const { children, name, active, switch_to } = this.props
    let style = { overflow: 'hidden' }
    if (active != name) {
      style.height = 0
      style.width = 0
    } else {
      style.height = H - 48
    }
    return (
      <View style={style}>
				{React.cloneElement(children, {switch_to})}
			</View>
    )
  }
}
