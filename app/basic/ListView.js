import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'

import { flexCenter } from 'basic'
import { W, H } from 'domain/def'

const flag = false;

const nextReplaceScrollState = (cards, itemHeights, H2, S, y) => {
  const sTop = Math.floor(S / 2)

  let sum = 0
  let p = 0
  for (let i = 0; i < cards.length; i++) {
    if (sum > y - H2) {
      p = cards[i].id
      break
    }
    sum += itemHeights[cards[i].id]
  }
  p = p - sTop
  if (p < 0) {
    p = 0
  }

  const lst1 = cards.filter(card => card.id < p).map(card => itemHeights[card.id])
  const H1 = lst1.length > 0 ? lst1.reduce((h1, h2) => h1 + h2) : 0

  const q = p + S
  const lst3 = cards.filter(card => card.id > q).map(card => itemHeights[card.id])
  const H3 = lst3.length > 0 ? lst3.reduce((h1, h2) => h1 + h2) : 0
  return { p, q, H1, H3 }
}

export class ListView extends Component {
  static defaultProps = {
    displaySize: 10,
    initialData: [],
    renderBottomIndicator: () => {
      return (
        <View style={{height: 42, ...flexCenter}}>
          <ActivityIndicator />
        </View>
      )
    }
  }
  constructor(props) {
    super()
    this.y = 0
    this.itemHeights = []
    this.id_counter = 0
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.append(this.props.initialData)
  }

  append(list) {
    const nList = list.map((item, i) => {
      return {
        id: ++this.id_counter,
        item
      }
    })

    const I = setInterval(() => {
      if (this.itemHeights[this.id_counter]) {
        clearInterval(I)

        this.setState({
          ...nextReplaceScrollState(this.state.data, this.itemHeights, this.height, this.props.displaySize, this.y),
          scrollLock: false,
          newlyAdded: []
        })
      }
    }, 100)
    this.setState({
      data: [...this.state.data, ...nList],
      newlyAdded: nList,
      scrollLock: true
    })
  }

  reset(list) {
    this.itemHeights = []
    this.id_counter = 0
    this.setState({
      data: [],
      newlyAdded: [],
      scrollLock: false,
      p: 0,
      q: 0
    }, () => {
      this.append(list)
    })
  }

  render() {
    const { p, q, H1, H3, newlyAdded, scrollLock, data } = this.state
    let visibleData = data.filter(({ item, id }) => {
      if (id >= p && id <= q) {
        return true
      }
      return false
    })
    if (newlyAdded && newlyAdded.length > 0) {
      visibleData = [
        ...visibleData,
        ...newlyAdded.filter(x => !visibleData.find(t => t.id === x.id))
      ]
    }

    return (
      <ScrollView
        onLayout={(e)=>this._layout(e)}
        onScroll={(e)=>this._scroll(e)}
        onResponderRelease={(e)=>this._scrollRelease(e)}
        scrollEventThrottle={200}
        refreshControl={this.props.refreshControl}
      >
        <View style={{height: H1}}></View>
        {
          visibleData.map((item)=>this._renderItem(item))
        }
        <View style={{height: H3}}></View>
        {this.props.renderBottomIndicator()}
      </ScrollView>
    )
  }

  _layout({ nativeEvent: { layout } }) {
    this.height = layout.height
  }

  _scroll(e) {
    this.y = e.nativeEvent.contentOffset.y

    let atBottom = this.y + this.height - e.nativeEvent.contentSize.height
    let atBottomFlag = (atBottom >= 0)
    if (atBottomFlag) {
      this.props.onScrollToBottom(atBottom)
    }

    if (!this.state.scrollLock) {
      this.setState({
        ...nextReplaceScrollState(this.state.data, this.itemHeights, this.height, this.props.displaySize, this.y)
      })
    }
  }

  _renderItem({ item, id }) {
    return (
      <View key={id} onLayout={(e)=>this._itemLayout(e, id)}>
        {this.props.renderItem(item, id)}
      </View>
    )
  }

  _itemLayout({ nativeEvent: { layout } }, id) {
    this.itemHeights[id] = layout.height
  }

  _scrollRelease(e) {
    this.props.onResponderRelease && this.props.onResponderRelease(e)
  }
}
