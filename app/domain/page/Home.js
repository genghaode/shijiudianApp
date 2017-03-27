import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, RefreshControl, } from 'react-native'
import Swiper from 'react-native-swiper'
import { Routes } from 'domain/page'
import { ItemCard } from 'domain/component'
import { flexCenter, ListView } from 'basic'
import { H, W, OS } from 'domain/def'
import { get_itemList } from 'domain/api/apis'

export class Home extends Component {
  constructor() {
    super()
    this.state = {
      initialized: false
    }
  }

  componentDidMount() {
    this.start = 0
    this.take = 10
    this.hasMore = false
    this.itemList = [null]
    this.loadList()
  }

  async loadList() {
    if (this.loading) {
      return false
    }

    try {
      this.loading = true
        // const res = await get_itemList(this.start, this.take)
      let res = {}
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          res = { data: { total: 20, itemList: [{ title: '001' }, { title: '002' }, { title: '003' }, { title: '004' }, { title: '005' }, { title: '006' }, { title: '007' }, { title: '008' }, { title: '009' }, { title: '010' }] } }
          resolve()
        }, 2000)
      })
      this.itemList = [...this.itemList, ...res.data.itemList]
      this.start = this.start + res.data.itemList.length
      this.hasMore = this.itemList.length < res.data.total + 1
      this.setState({
        initialized: true
      }, () => {
        this.refs.listView.append(res.data.itemList)
      })

    } catch (e) {
      console.log(e)
    } finally {
      if (this.hasMore) {
        this.loading = false
      }
    }
  }

  render() {
    const { initialized } = this.state

    if (!initialized) {
      return (
        <View style={{...flexCenter, height: H}}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{flex: 1,marginBottom: OS==='ios'?58:78}}>
        <ListView
          ref="listView"
          initialData={[null]}
          renderItem={(item, id)=> this._renderItem(item, id)}
          onScrollToBottom={()=>this._onScrollToBottom()}
          renderBottomIndicator={()=>this._renderBottomIndicator()}
          refreshControl={<RefreshControl refreshing={false} onRefresh={()=>this._refresh()} />}
        />
      </View>
    )
  }
  _renderItem(item, id) {
    if (!item) {
      return (
        <View>
          <Swiper
            dot={<View style={{...dotStyle, backgroundColor: 'rgba(0,0,0,.1)'}} />}
            activeDot={<View style={{...dotStyle, backgroundColor: 'white'}} />}
            height={W*0.46931}
            autoplay
          >
            <View style={{flex: 1}}>
              <Image source={{uri: "http://dimage.yissimg.com/themes/front/mobile/images/banner_wap823.jpg!tall.jpg"}} style={{width: W, height: W*0.46931}}  resizeMode="contain" />
            </View>
            <View style={{flex: 1}}>
              <Image source={{uri: "http://dimage.yissimg.com/themes/front/mobile/images/mobile_ad_0722.jpg!tall.jpg"}} style={{width: W, height: W*0.46931}} resizeMode="contain" />
            </View>
          </Swiper>
        </View>
      )
    } else {
      return (<ItemCard onPress = {() => this._onPress(item)} {...item } />)
    }
  }
  _onPress(item) {
    console.log(item)
  }

  _onScrollToBottom(y) {
    this.y = y
    this.loadList()
  }

  _renderBottomIndicator() {
    if (!this.state.initialized) {
      return false
    }
    if (!this.hasMore) {
      return (
        <View style={{height: 48, ...flexCenter}}>
          <Text>没有更多了</Text>
        </View>
      )
    }
    return (
      <View style={{height: 48, flexDirection: 'row', ...flexCenter}}>
        <ActivityIndicator />
        <Text> 正在加载...</Text>
      </View>
    )
  }
  _refresh() {
    this.start = 0
    this.hasMore = false
    this.itemList = [null]
    this.loading = false
    this.loadList().then(() => {
      this.refs.listView.reset(this.itemList)
    })
  }
}

const dotStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginLeft: 3,
  marginRight: 3,
  marginTop: 3,
  marginBottom: 3
}
