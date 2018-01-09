import {Link, withRouter} from 'react-router-dom'
import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import ListErrors from '../../components/ListErrors'

@inject('authStore')
@withRouter
@observer
export default class Login extends React.Component {
  static propTypes = {
    authStore: PropTypes.object
  }

  handleEmailChange = e => this.props.authStore.setEmail(e.target.value)

  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value)

  handleSubmitForm = (e) => {
    e.preventDefault()
    // TODO 异步跳转最佳实践
    this.props.authStore.login()
      // .then(() => this.props.history.replace('/'))
  }

  render () {
    const {values, errors, inProgress} = this.props.authStore

    return (
      <div >
        <div >
          <div >

            <div >
              <h1 >Sign In</h1>
              <p >
                <Link to="register">
                  Need an account?
                </Link>
              </p>

              <ListErrors errors={errors} />

              <form onSubmit={this.handleSubmitForm}>
                <fieldset>

                  <fieldset >
                    <input
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={this.handleEmailChange}
                    />
                  </fieldset>

                  <fieldset >
                    <input
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={this.handlePasswordChange}
                    />
                  </fieldset>

                  <Button
                    type="submit"
                    disabled={inProgress}
                  >
                    Sign in
                  </Button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
