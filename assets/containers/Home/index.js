import React from 'react'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

@translate('translations')
@inject('userStore')
@withRouter
@observer
export default class Home extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  }

  render () {
    let {currentUser} = this.props.userStore
    let {t} = this.props
    let el = currentUser ? (
      <div>
        <label>{currentUser.username}</label>
        <strong>{currentUser.password}</strong>
      </div>
    ) : <span>{t('signInDesc')}</span>
    return (
      <div>
        <div>
          <div className="row">
            {el}
          </div>
        </div>

      </div>
    )
  }
}
