export const types = {
  SWITCH_MENU: 'SWITCH_MENU',
  UPDATE_TOKEN: 'UPDATE_TOKEN'
}

export const switchMenu = (breadcrumb) => {
  return {
    type: types.SWITCH_MENU,
    breadcrumb
  }
}

export const updateToken = (token) => {
  return {
    type: types.UPDATE_TOKEN,
    token
  }
}
