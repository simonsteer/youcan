export const sessionSetToken = (token: string) =>
  ({
    type: 'SESSION_SET_TOKEN',
    payload: { token },
  } as const)

export const sessionClearToken = (token: string) =>
  ({
    type: 'SESSION_CLEAR_TOKEN',
    payload: { token },
  } as const)
