import React from 'react'

export default class Panel extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    actions: React.PropTypes.object,
    states: React.PropTypes.object
  }

  toggleDisplay = () => {
    this.props.actions[`switchMode$$${this.props.placeholder}`]()
  }

  render () {
    return (
      <div>
        <h3>
          {this.props.title}
          &nbsp;
          <span>
            <a href="javascript:;" onClick={this.toggleDisplay}>{this.props.states[this.props.placeholder].mode === 'chart' ? 'Chart' : 'Table'}</a>
          </span>
        </h3>
      </div>
    )
  }
}
