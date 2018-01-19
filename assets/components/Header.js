import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {H1, A} from 'components/styled'

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
          <br />
          <A href="#/chart">Chart</A> |&nbsp;
          <A href="#/login">Login</A>
        </div>
      </nav>
    )
  }
}
