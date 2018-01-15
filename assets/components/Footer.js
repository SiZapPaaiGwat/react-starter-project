import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {translate} from 'react-i18next'

@translate('translations')
@observer
export default class Footer extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired
  }

  render () {
    const {t, i18n} = this.props
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng)
    }
    return (
      <div >
        <a style={{marginRight: 24}} href="javascript:;" onClick={() => changeLanguage('zh-CN')}>简体中文</a>
        <a href="javascript:;" onClick={() => changeLanguage('en')}>English</a>

        <hr />
        <span>{t('description.part1')}</span>
      </div>
    )
  }
}
