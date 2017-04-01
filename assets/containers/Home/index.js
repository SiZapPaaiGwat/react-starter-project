import React from 'react'

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
        <button onClick={this.toggleDialog}>Toggle dialog (Sync action) </button>
        <p>Dialog status: {showModal ? 'open' : 'closed'}</p>
        <hr />
        <button onClick={this.handleInsert}>
          {insertUserLoading ? 'Inserting ...' : 'Insert an user (Async action)'}
        </button>
        {list}
      </div>
    )
  }
}
