import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { COLOR_TITLE } from 'domain/def'

export class ItemCard extends Component {
  render() {
    const { title } = this.props
    return (
      <TouchableWithoutFeedback elevation={true} onPress={this.props.onPress}>
				<View style={{...itemCardWrap}}>
					<Title>{title}</Title>
				</View>
			</TouchableWithoutFeedback>
    )

  }
}

const Title = ({ children }) => {
  return <Text style={{...Paragraph, color : COLOR_TITLE, fontSize : 18, fontWeight : 'bold'}}>{children}</Text>

}

const Paragraph = {
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 10
}

const itemCardWrap = {
  height: 200,
  backgroundColor: "white",
  marginBottom: 0,
  paddingBottom: 10,
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "#c7c8c9"
}
