import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { FormScrollView, FormConnector, ValidateMethods, flexCenter } from 'basic'
import { GButton, GInput } from 'domain/component'
import { login } from 'domain/api/apis'
import { COLOR_PRIMARY } from 'domain/def'
import { Routes } from 'domain/page'

const fields = ['username', 'password']

const validate = (assert, fields) => {
  assert('username', ValidateMethods.required(), '请输入用户名')
  assert('password', ValidateMethods.required(), '请输入密码')
}

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      busy: false
    }
    console.log(111)
    setTimeout(() => {
      console.log(3333)
      store.dispatch({ type: 'NETWORK_RETRY' })
      console.log(store.getState())
      console.log(4444)
    })
    console.log(2222)
  }

  render() {
    return (
      <FormScrollView>
      	<FormConnector
      		fields={fields}
      		validate={validate}
      		submit={(data, err)=>this._submit(data, err)}
      	>
      		<LoginForm busy={this.state.busy} navigator={this.props.navigator} />
      	</FormConnector>
      </FormScrollView>
    )
  }
  async _submit(data, err) {
    console.log(err)
    if (err.length > 0) {
      alert(err[0])
      return false
    }

    this.setState({ busy: true })
    const { username, password } = data
    // const result = await login({ username, password })
    // this.setState({ busy: false })

    // store.dispatch({
    //   type: 'LOGIN_SUCCESS',
    //   name: result.name
    // })
    // if (this.props.route.from) {
    //   this.props.navigator.pop()
    // }
  }
}

const LoginForm = ({ form, fields, submit, busy, navigator }) => {
  const { username, password } = fields
  return (
    <View style={{marginTop: 200}}>	
			<GInput placeholder="用户名" {...username} />
			<GInput placeholder="密码" {...password} secureTextEntry={true} />
			<View style={{...flexCenter, marginTop:20}}>
				<GButton onPress={submit} loading={busy}>登录</GButton>
			</View>
			
		</View>
  )
}
