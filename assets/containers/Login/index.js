import {withRouter} from 'react-router-dom'
import React from 'react'
import {observer} from 'mobx-react'
import LoginForm from './LoginForm'

@withRouter
@observer
export default class Login extends React.Component {
  render () {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
}
