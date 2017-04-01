/**
 * https://github.com/shuvalov-anton/superagent-mocker
 */

import mock from 'dejs/lib/mock'
import * as user from './user'

export default function () {
  mock([
    user
  ], {
    appContextPath: App.CONTEXT_PATH,
    timeout: 3000
  })
}
