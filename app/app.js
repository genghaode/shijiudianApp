import React, { Component } from 'react'
import { View, Text, Navigator, BackAndroid, StatusBar, Dimensions, Platform } from 'react-native'
import { connect } from 'react-redux'
import { OS, W, COLOR_NAV_DARK, COLOR_TITLE } from 'domain/def'
import { Routes } from 'domain/page'
import { flexCenter } from 'basic'
import { GNavbar } from 'domain/component'

class _App extends Component {
  constructor() {
    super()
    this.nextTimeExit = false
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const navigator = this.refs.navigator
      if (!navigator) {
        return false
      }
      const routes = navigator.getCurrentRoutes()
      if (routes.length === 1) {
        if (!this.nextTimeExit) {
          alert('再按一次退出')
          this.nextTimeExit = true
          setTimeout(() => {
            this.nextTimeExit = false
          }, 3000)
          return true
        }
        return false
      } else if (routes.length > 1) {
        navigator.pop()
        return true
      }
    })
  }
  render() {
    const { network, active } = this.props
    return (
      <View style={{flex: 1}}>
        <Navigator 
          ref="navigator" 
          initialRoute={Routes.Tabs}
          renderScene={(route, navigator) =>this._renderScene(route, navigator, this.props.active)}
          navigationBar={this._renderNavBar(active)}
        />
      </View>
    )
  }
  _renderScene(route, navigator, active) {
    const { Comp } = route
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle={route.Inverse ? 'light-content' : 'default'} />
        {
          ((route.name ==='Tabs' && route.Title[active]) || (route.name !=='Tabs' && route.Title)) &&  
          <View style={{backgroundColor: route.Inverse ? COLOR_NAV_DARK : 'white', height: OS === 'ios' ? 64 : 56}}></View>
        }
        <Comp navigator={navigator} route={route} />
      </View>
    )
  }
  _renderNavBar(active) {
    const titleStyle = {
      flex: 1,
      ...flexCenter
    }

    const routeMapper = {
      LeftButton: (route, navigator, index, navState) => {
        if (index === 0) {
          return null
        }
        return ((route.name === 'Tabs' && route.Title[active]) || (route.name !== 'Tabs' && route.Title)) && <GNavbar.Back navigator={navigator} route={route} />
      },
      RightButton: (route, navigator, index, navState) => {
        return null
      },
      Title: (route, navigator, index, navState) => {
        const t_style = {...titleStyle }
        if (OS === 'android') {
          t_style.width = W - 148
        }
        return ((route.name === 'Tabs' && route.Title[active]) || (route.name !== 'Tabs' && route.Title)) && (
          <View style={{...t_style}}>
            <Text style={{color : route.Inverse ? "white" : COLOR_TITLE, fontSize : 18}}>{route.name ==='Tabs'?route.Title[active] : route.Title}</Text>
          </View>
        )
      }
    }
    return (
      <Navigator.NavigationBar
        routeMapper={routeMapper}
      />
    )
  }
}

export const App = connect(state => {
  return {
    network: state.network,
    active: state.tab.active
  }
})(_App)
