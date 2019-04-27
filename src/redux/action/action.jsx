export const types = {
  SWITCH_MENU: 'SWITCH_MENU',
  UPDATE_TOKEN: 'UPDATE_TOKEN'
}

export const switchMenu = (menuName) => {
  return {
    type: types.SWITCH_MENU,
    menuName
  }
}

export const updateToken = (token) => {
  return {
    type: types.UPDATE_TOKEN,
    token
  }
}
