/* eslint-disable */
import store from '../assets/stores/authStore'

jest.useFakeTimers()

describe('authStore', () => {
  it('should set username and password', () => {
    store.setUsername('username')
    expect(store.username).toBe('username')
    store.setPassword('password')
    expect(store.password).toBe('password')
  })

  it('should toggle inProgress when login', () => {
    jest.advanceTimersByTime(2000)
    expect(store.inProgress).toBe(false)
    let promise = store.login()
    expect(store.inProgress).toBe(true)
    jest.advanceTimersByTime(2000)
    promise.then(() => {
      expect(store.inProgress).toBe(false)
    })
  })
})
