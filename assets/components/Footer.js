import React from 'react'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'
import {translate} from 'react-i18next'
import {A} from 'components/styled'

@translate('translations')
@inject('uiStore')
@observer
export default class Footer extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired,
    uiStore: PropTypes.object.isRequired
  }

  changeTheme = () => {
    if (this.props.uiStore.themeName === 'light') {
      this.props.uiStore.changeTheme('dark')
    } else {
      this.props.uiStore.changeTheme('light')
    }
  }

  render () {
    const {t, i18n} = this.props
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng)
    }
    return (
      <div>
        <A style={{marginRight: 24}} href="javascript:;" onClick={() => changeLanguage('zh-CN')}>简体中文</A>
        <A href="javascript:;" onClick={() => changeLanguage('en')}>English</A>

        <hr />

        <span>{t('description.part1')}</span>

        <br />

        <A href="javascript:;" onClick={this.changeTheme}>换肤</A>
      </div>
    )
  }
}
