import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
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
          <Link to="/">
            <span>{this.props.commonStore.appName.toLowerCase()}</span>
          </Link>
        </div>
      </nav>
    )
  }
}
