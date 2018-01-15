/* eslint-disable */
import store from '../assets/stores/authStore'

jest.useFakeTimers()

describe('authStore', () => {
  it("should set username and password", () => {
    store.setUsername('username')
    expect(store.username).toBe('username')
    store.setPassword('password')
    expect(store.password).toBe('password')
  })

  // TODO test promise
})
