import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { GButton } from 'domain/component'
import { flexCenter } from 'basic'
import { Routes } from 'domain/page'

export class Me extends Component {
  render() {
    return (
      <View style={{flex: 1, ...flexCenter}}>
				<GButton onPress={()=>this._onPress()}>登录</GButton>
			</View>
    )
  }
  _onPress() {
    console.log(this.props)
    this.props.navigator.push(Routes.Login)
  }
}
