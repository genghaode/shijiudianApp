import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { flexCenter } from 'basic'

export class GNavbar extends Component {
  render() {
    return null
  }
}

class GNavbarBackButton extends Component {
  static defaultProps = {
    text: '返回'
  }
  render() {
    const { text, route } = this.props
    let style = {}
    if (route.Inverse) {
      style.color = '#fff'
    } else {
      style.color = '#000'
    }
    return (
      <TouchableOpacity onPress={()=>this._onPress()} style={{flex: 1, ...flexCenter, flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
				<Icon name="ios-arrow-back" size={30} color={style.color}/>
				<Text style={{...style, paddingLeft: 5}}>{text}</Text>
			</TouchableOpacity>
    )
  }
  _onPress() {
    this.props.navigator.pop()
  }
}

GNavbar.Back = GNavbarBackButton
