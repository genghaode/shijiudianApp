import React, { Component } from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'
import { flexCenter } from 'basic/style'

export class Button extends Component {
  static defaultProps = {
    backgroundColor: '#ddd',
    height: 40,
    width: 100,
    loading: false,
    fontSize: 14,
    borderRadius: 5
  }
  render() {
    const { height, width, backgroundColor, loading, fontSize, borderRadius, children } = this.props
    if (loading) {
      return (
        <View style={{backgroundColor, width, height, ...flexCenter}}>
    			<ActivityIndicator />
    		</View>
      )
    }
    return (
      <TouchableOpacity style={{backgroundColor, height, width, borderRadius, ...flexCenter, ...this.props.style}} onPress={()=>this._onPress()}>
    		<Text style={{color: 'white'}}>{children}</Text>
    	</TouchableOpacity>
    )
  }
  _onPress() {
    this.props.onPress && this.props.onPress()
  }
}
