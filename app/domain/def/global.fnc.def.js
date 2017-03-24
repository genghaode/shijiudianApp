import Toast from 'react-native-toast'

global.asset_request = (json) => {
  if (json.code == 1000) {
    Toast.show(json.data)
    return false
  }
  return true
}

global.alert = (text) => {
  setTimeout(() => {
    Toast.show(text)
  }, 1)
}
