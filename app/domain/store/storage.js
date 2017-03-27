export const get_local_token = () => {
  return store.getState().user.token
}

export const set_local_token = async(token) => {
  store.dispatch({ type: 'SET_TOKEN', token })
}
