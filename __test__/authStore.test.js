/* eslint-disable */
import nock from 'nock'
import promiseFinally from 'promise.prototype.finally'
import store from 'stores/authStore'

promiseFinally.shim()
jest.useFakeTimers()
nock('http://127.0.0.1:8080')
  .get('/')
  .reply(400, 'login ok')

beforeEach(() => {
  store.reset()
})

describe('authStore', () => {
  it('should set username and password', () => {
    store.setUsername('username')
    expect(store.username).toBe('username')
    store.setPassword('password')
    expect(store.password).toBe('password')
  })

  it('should toggle inProgress when mockLogin', () => {
    jest.advanceTimersByTime(2000)
    expect(store.inProgress).toBe(false)
    let promise = store.mockLogin()
    expect(store.inProgress).toBe(true)
    jest.advanceTimersByTime(2000)
    promise.then(() => {
      expect(store.inProgress).toBe(false)
    })
  })

  it('should toggle inProgress when login', () => {
    expect(store.inProgress).toBe(false)
    let promise = store.login()
    expect(store.inProgress).toBe(true)
    promise.then(() => {
      expect(store.inProgress).toBe(false)
      expect(store.errors).toBeInstanceOf(Error)
    })
  })
})
