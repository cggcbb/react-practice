import { types } from '../action/action'

const initialState = {
  menuName: '首页'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      }
    default:
      return {
        ...state
      }
  }
}