import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { flexCenter } from 'basic'

class _Tabbar extends Component {
  switch_to(name) {
    store.dispatch({
      type: 'SWITCH_TAB',
      active: name
    })
  }
  render() {
    const { children, active } = this.props
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', overflow: 'hidden'}}>
        <View style={{flex: 1}}>
          {
            children.map((child, i) => {
              return React.cloneElement(child, {key: i, active, switch_to: ()=>this.switch_to(name)})
            })
          }
        </View>
        <View style={{backgroundColor: 'white', height: 48, flexDirection: 'row', borderTopWidth: 1, borderColor: '#ccc'}}>
          {
            children.map((child, i) => {
              const {title, name, icon, activeIcon} = child.props
              return (
                <TouchableOpacity
                  onPress={()=>this.switch_to(name)}
                  key={i}
                  style={{flex: 1, height: 48, ...flexCenter}}
                >
                  {name==active?activeIcon:icon}
                  <Text>{title}</Text>  
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export const Tabbar = connect(state => {
  return {
    active: state.tab.active
  }
})(_Tabbar)
