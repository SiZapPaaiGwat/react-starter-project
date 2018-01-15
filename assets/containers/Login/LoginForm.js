import React from 'React'
import PropTypes from 'prop-types'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import {inject, observer} from 'mobx-react'
import {translate} from 'react-i18next'
import styles from './styles.css'

const FormItem = Form.Item

@translate('translations')
@inject('authStore')
@observer
class NormalLoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    authStore: PropTypes.object.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.authStore.setUsername(values.username)
        this.props.authStore.setPassword(values.password)
        this.props.authStore.login().then(function () {
          console.log(123)
        })
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className={styles.loginFormForgot} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton} loading={this.props.authStore.inProgress}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(NormalLoginForm)
