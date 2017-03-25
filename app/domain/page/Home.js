import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator, RefreshControl } from 'react-native'
import { Routes } from 'domain/page'
import { ItemCard } from 'domain/component'
import { flexCenter, ListView } from 'basic'
import { H } from 'domain/def'

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

  loadList() {
    if (this.loading) {
      return false
    }

    try {
      this.loading = true

      const res = { data: { total: 20, itemList: [{ title: '001' }, { title: '002' }, { title: '003' }, { title: '004' }, { title: '005' }, { title: '006' }, { title: '007' }, { title: '008' }, { title: '009' }, { title: '010' }] } }

      this.itemList = [...this.itemList, ...res.data.itemList]
      this.start = this.start + res.data.itemList.length
      this.hasMore = this.itemList.length < res.data.total

      this.setState({
        initialized: true
      }, () => {
        this.refs.listView.append(res.data.itemList)
      })
    } catch (e) {

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
      <View style={{marginBottom: 48}}>
        <ListView
          ref="listView"
          initialData={[]}
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
      console.log('item为false')
      return null
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
        <View style={{height: 42, ...flexCenter}}>
          <Text>没有更多了</Text>
        </View>
      )
    }
    return (
      <View style={{height: 42, ...flexCenter}}>
        {
          this.loading ? <Text>正在加载...</Text> : <ActivityIndicator />
        }
      </View>
    )
  }
  _refresh() {
    this.start = 0
    this.hasMore = false
    this.itemList = [null]
    this.refs.listView.reset(this.itemList)
    this.loadList()
  }
}
