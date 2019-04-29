import { types } from '../action/action'

const initialState = {
  breadcrumb: [{ title: '首页', key: 'index' }],
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_MENU:
      return {
        ...state,
        breadcrumb: action.breadcrumb
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