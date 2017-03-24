import React, { Component } from 'react'
import { View } from 'react-native'
import { Routes } from 'domain/page'
import { GButton } from 'domain/component'
import { flexCenter } from 'basic'

export class Home extends Component {
  render() {
    alert('hello')
    return (
      <View style={{flex: 1, ...flexCenter, marginBottom: 48}}>
      <GButton onPress={()=>this._onPress()}>Home</GButton>
    </View>
    )
  }
  _onPress() {
    this.props.navigator.push(Routes.Example)
  }
}
