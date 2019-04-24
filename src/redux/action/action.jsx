export const types = {
  SWITCH_MENU: 'SWITCH_MENU'
}

export const switchMenu = (menuName) => {
  return {
    type: types.SWITCH_MENU,
    menuName
  }
}
