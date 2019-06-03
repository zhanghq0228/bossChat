import React, { Component } from 'react'
import Logo from '../../component/Logo/Logo'
import { List, InputItem, WhiteSpace, Button, WingBlank } from "antd-mobile"
import { connect } from "react-redux"
import { login } from "../../redux/user.redux"
import { Redirect } from "react-router-dom"
import imoocForm from "../../component/form/Form"
export class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.register = this.register.bind(this)
  }

  register(){
    this.props.history.push("/register")
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        {this.props.redirecTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirecTo} />:null}
        <Logo></Logo>
        {this.props.msg?<p className="error_msg">{this.props.msg}</p>:""}
        <WingBlank>
        <List>
        <InputItem
        onChange={v=>this.props.handlerChange("user",v)}
        >用户:</InputItem>
        <WhiteSpace></WhiteSpace>
        <InputItem
        type="password"
        onChange={v=>this.props.handlerChange("pwd",v)}
        >密码:</InputItem>
        </List>
          <Button type="primary"
          onClick={this.handleLogin}
          >登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
Login = connect(state=>state.user,{login})(Login)
// Login = propsProxyHoc(Login)();
export default imoocForm(Login)
