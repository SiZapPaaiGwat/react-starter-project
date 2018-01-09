import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import {translate, Trans} from 'react-i18next'

@translate('translations')
@inject('userStore', 'commonStore')
@observer
class Header extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    commonStore: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired
  }

  render () {
    const {t} = this.props
    const {i18n} = this.props
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng)
    }
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.commonStore.appName.toLowerCase()}
          </Link>
          <button onClick={() => changeLanguage('zh-CN')}>中文</button>
          <button onClick={() => changeLanguage('en')}>EN</button>
          <Trans i18nKey="title">
            预设内容
          </Trans>

          <span>{t('title')}</span>
        </div>
      </nav>
    )
  }
}

export default Header
