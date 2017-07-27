/**
 * dmp 主页:Menu导航菜单
 */
import React from 'react'
import style from './style.cssx'

export default class Entry extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    actions: React.PropTypes.object.isRequired,
    states: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  }

  render () {
    return (
      <div className={style.wrapper}>
        <div className={style.header}>Header content</div>
        <div className={style.body}>
          <h1>Body content</h1>
          {
            this.props.children ? React.cloneElement(this.props.children, {
              actions: this.props.actions,
              states: this.props.states,
              params: this.props.params
            }) : (
              <div style={{textAlign: 'center', fontSize: '18px'}}>加载中...</div>
            )
          }
        </div>
        <div className={style.footer}>Footer content</div>
      </div>
    )
  }
}
