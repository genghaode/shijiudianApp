import React, { Component } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { COLOR_TEXT_LIGHT } from 'domain/def'

export class GInput extends Component {
  render() {
    const { error, ...others } = this.props
    return (
      <View>
    		<TextInput
    			onChangeText={(value)=>this._change(value)}
    			style={styles.input}
    			underlineColorAndroid={'rgba(0,0,0,0)'}
    			{...others}
    		/>
    	</View>
    )
  }
  _change(value) {
    this.props.onChange(value)
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eee",
    paddingLeft: 20,
    paddingRight: 20,
    height: 42,
    marginLeft: 20,
    marginRight: 20,
    color: COLOR_TEXT_LIGHT,
    marginTop: 20

  }
})
