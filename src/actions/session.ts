export const actionTypes = {
  SESSION_SET_TOKEN: 'SESSION_SET_TOKEN',
  SESSION_CLEAR_TOKEN: 'SESSION_CLEAR_TOKEN',
} as const

export const sessionSetToken = (token: string) => ({
  type: actionTypes.SESSION_SET_TOKEN,
  payload: { token },
})
