import { types } from '../action/action'

const initialState = {
  menuName: '首页',
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      }
    case types.UPDATE_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return {
        ...state
      }
  }
}