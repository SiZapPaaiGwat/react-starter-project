import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {translate, Trans} from 'react-i18next'

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
        <button onClick={() => changeLanguage('zh-CN')}>中文</button>
        <button onClick={() => changeLanguage('en')}>EN</button>

        <hr />
        <Trans i18nKey="title">
          预设内容
        </Trans>
        <br />
        <span>{t('description.part1')}</span>
      </div>
    )
  }
}
