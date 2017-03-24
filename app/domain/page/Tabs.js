import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import { Tabbar, TabbarItem } from 'domain/component'
import { Home } from './Home'
import { Category } from './Category'
import { Me } from './Me'

export class Tabs extends Component {
  render() {
    const { navigator, route } = this.props
    return (
      <Tabbar>
    		<TabbarItem
    			name="home"
    			title="首页"
    			activeIcon={<Icon name="ios-home" size={20} />}
    			icon={<Icon name="ios-home-outline" size={20} />}
    		>
    			<Home navigator={navigator} route={route} />
    		</TabbarItem>
    		<TabbarItem
    			name="category"
    			title="分类"
    			activeIcon={<Icon name="ios-keypad" size={20} />}
    			icon={<Icon name="ios-keypad-outline" size={20} />}
    		>
    			<Category navigator={navigator} route={route} />
    		</TabbarItem>
    		<TabbarItem
    			name="me"
    			title="我的"
    			activeIcon={<Icon name="ios-contact" size={20} />}
    			icon={<Icon name="ios-contact-outline" size={20} />}
    		>
    			<Me navigator={navigator} route={route} />
    		</TabbarItem>
    	</Tabbar>
    )
  }
}
