/**
 * dmp 主页:Menu导航菜单
 */
import React from 'react'

export default class Home extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    actions: React.PropTypes.object,
    states: React.PropTypes.object,
    params: React.PropTypes.object
  }

  handleInsert = () => {
    this.props.actions.insertUser({
      username: Date.now().toString(16),
      age: 31,
      name: 'simon'
    })
  }

  handleRemove = (uid) => {
    this.props.actions.removeUser(uid)
  }

  toggleDialog = () => {
    this.props.actions.toggleUserDialog()
  }

  render () {
    let {showModal, datalist, insertUserLoading} = this.props.states.user

    return (
      <div>
        <h2>Home page</h2>
        <hr />
        <button onClick={this.toggleDialog}>Toggle dialog</button>
        <h3>Dialog status: {showModal ? 'open' : 'closed'}</h3>
        <hr />
        <button onClick={this.handleInsert}>Insert an user {insertUserLoading ? 'Adding ...' : ''}</button>
        <ul>
          {
            datalist.map(item => {
              return (
                <li key={item.uid}>
                  uid: {item.uid} &nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="javascript:;" onClick={this.handleRemove.bind(this, item.uid)}>Remove</a>
                </li>
              )
            })
          }
        </ul>
        <hr/>
      </div>
    )
  }
}
