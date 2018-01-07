import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Banner from './Banner';

@inject('commonStore', 'userStore')
@withRouter
@observer
export default class Home extends React.Component {
  render() {
    const {appName} = this.props.commonStore
    let {currentUser} = this.props.userStore
    let el = currentUser ? (
      <div>
        <label>{currentUser.username}</label>
        <strong>{currentUser.email}</strong>
      </div>
    ) : <span>Sign in please ...</span>
    return (
      <div className="home-page">

        <Banner appName={appName} />

        <div className="container page">
          <div className="row">
            {el}
          </div>
        </div>

      </div>
    );
  }
}
