import React from 'react'
import {Button} from 'antd'
import Panel from '../../components/Panel'

export default class Home extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    states: React.PropTypes.object
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
    let {showModal, datalist, insertUserLoading, removeUserSelected} = this.props.states.user
    let list = datalist.length ? (
      <ul>
        {
          datalist.map(item => {
            let onClick = () => {
              this.handleRemove(item.uid)
            }
            return (
              <li key={item.uid}>
                uid: {item.uid} &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="javascript:;" onClick={removeUserSelected === item.uid ? null : onClick}>
                  {removeUserSelected === item.uid ? 'Removing ...' : 'Remove'}
                </a>
              </li>
            )
          })
        }
      </ul>
    ) : <p>No user now.</p>
    return (
      <div>
        <h2>Home page</h2>
        <hr />
        <Button onClick={this.toggleDialog}>Toggle dialog (Sync action) </Button>
        <p>Dialog status: {showModal ? 'open' : 'closed'}</p>
        <hr />
        <Button onClick={this.handleInsert} loading={insertUserLoading}>
          Insert an user (Async action)
        </Button>
        {list}
        <hr />
        <Panel
          title="New User Panel"
          placeholder="newPlayer"
          {...this.props}
        />
        <hr />
        <Panel
          title="Active User Panel"
          placeholder="activePlayer"
          {...this.props}
        />
      </div>
    )
  }
}
