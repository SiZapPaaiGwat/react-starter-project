import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {H1} from 'components/styled'

@inject('commonStore')
@observer
export default class Header extends React.Component {
  static propTypes = {
    commonStore: PropTypes.object.isRequired
  }

  render () {
    return (
      <nav>
        <div>
          <H1>{this.props.commonStore.appName.toLowerCase()}</H1>
        </div>
      </nav>
    )
  }
}
