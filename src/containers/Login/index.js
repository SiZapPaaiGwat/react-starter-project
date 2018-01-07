import { Link } from 'react-router-dom'
import ListErrors from '../../components/ListErrors'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('authStore')
@withRouter
@observer
export default class Login extends React.Component {
  handleEmailChange = e => this.props.authStore.setEmail(e.target.value)

  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value)

  handleSubmitForm = (e) => {
    e.preventDefault()
    // TODO 异步跳转最佳实践
    this.props.authStore.login()
      // .then(() => this.props.history.replace('/'))
  }

  render() {
    const { values, errors, inProgress } = this.props.authStore

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="register">
                  Need an account?
                </Link>
              </p>

              <ListErrors errors={errors} />

              <form onSubmit={this.handleSubmitForm}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={this.handleEmailChange}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={this.handlePasswordChange}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}
                  >
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
