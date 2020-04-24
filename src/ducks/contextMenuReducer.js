const initialState = {
  x: null,
  y: null,
  show: false,
}

const SHOW_CONTEXT_MENU = 'SHOW_CONTEXT_MENU'
const HIDE_CONTEXT_MENU = 'HIDE_CONTEXT_MENU'

export function showContextMenu(x, y) {
  return {
    type: SHOW_CONTEXT_MENU,
    payload: { x, y, show: true },
  }
}

export function hideContextMenu() {
  return {
    type: HIDE_CONTEXT_MENU,
    payload: { x: null, y: null, show: false },
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_CONTEXT_MENU:
      return { ...state, ...action.payload }
    case HIDE_CONTEXT_MENU:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
