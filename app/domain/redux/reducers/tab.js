const initialState = {
  active: 'home'
}

export const tab = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_TAB':
      return {...state, active: action.active }
    default:
      return state
  }
}
