import React, { Component } from 'react'
import { View, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { H } from 'domain/def'

export class FormScrollView extends Component {
  constructor() {
    super()
    this.state = {
      height: null
    }
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardDidShow(e))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this._keyboardDidHide())
  }
  _keyboardDidShow(e) {
    const h = e.endCoordinates.height
    const newH = H - h - 64
    this.setState({
      height: newH
    })
  }
  _keyboardDidHide() {
    this.setState({
      height: this.height
    })
  }
  componentWillUnmount() {
    Keyboard.dismiss()
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }
  render() {
    const { height } = this.state
    const style = {}
    if (height) {
      style.height = height
    }
    return (
      <View style={style} onLayout={(e)=>this._layout(e)}>
    		<ScrollView keyboardShouldPersistTaps="always">
    			<TouchableWithoutFeedback onPress={()=>this._press()}>
    				<View>{this.props.children}</View>
    			</TouchableWithoutFeedback>
    		</ScrollView>
    	</View>
    )
  }
  _layout({ nativeEvent: { layout: { x, y, width, height } } }) {
    if (!this.height) {
      this.height = height
    }
  }
  _press() {
    Keyboard.dismiss()
  }
}
