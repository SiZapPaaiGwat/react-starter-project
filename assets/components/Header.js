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
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.commonStore.appName.toLowerCase()}
          </Link>
        </div>
      </nav>
    )
  }
}
