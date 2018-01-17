import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'

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
          <h1>{this.props.commonStore.appName.toLowerCase()}</h1>
        </div>
      </nav>
    )
  }
}
